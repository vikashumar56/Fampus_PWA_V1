'use client'

import { useEffect, useState } from 'react'
import { Typography, Table, Tag, Button, Space } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ManageOrdersPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [orders, setOrders] = useState<Model.Order[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('User must be logged in to view orders', {
        variant: 'error',
      })
      router.push('/home')
      return
    }
    fetchOrders()
  }, [userId])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const outlets = await Api.Outlet.findManyByOwnerId(userId, {
        includes: ['orders'],
      })
      const allOrders = outlets.flatMap(outlet => outlet.orders ?? [])
      setOrders(allOrders)
    } catch (error) {
      enqueueSnackbar('Failed to fetch orders', { variant: 'error' })
    }
    setLoading(false)
  }

  const handleRefresh = () => {
    fetchOrders()
  }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: user => user?.name || 'Unknown',
    },
    {
      title: 'Pickup Time',
      dataIndex: 'pickupTime',
      key: 'pickupTime',
      render: text => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => {
        let color = status === 'completed' ? 'green' : 'volcano'
        if (status === 'pending') color = 'geekblue'
        return <Tag color={color}>{status.toUpperCase()}</Tag>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => router.push(`/order/${record.id}`)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Manage Orders</Title>
      <Text type="secondary">
        Below you can find all the ongoing and incoming orders for your outlets.
      </Text>
      <Button
        icon={<ReloadOutlined />}
        onClick={handleRefresh}
        style={{ marginBottom: 16 }}
      >
        Refresh Orders
      </Button>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
      />
    </PageLayout>
  )
}
