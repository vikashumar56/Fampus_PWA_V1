'use client'

import { useEffect, useState } from 'react'
import { Typography, Descriptions, Button, Spin } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ViewOrderDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDetails = await Api.Order.findOne(params.id, {
          includes: ['user', 'outlet', 'orderItems', 'orderItems.foodItem'],
        })
        setOrder(orderDetails)
      } catch (error) {
        enqueueSnackbar('Failed to fetch order details', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [params.id])

  const goBack = () => {
    router.push('/home')
  }

  return (
    <PageLayout layout="full-width">
      <Button
        onClick={goBack}
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: 16 }}
      >
        Back to Home
      </Button>
      <Title level={2}>Order Details</Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        order && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
            <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
            <Descriptions.Item label="Pickup Time">
              {dayjs(order.pickupTime).format('YYYY-MM-DD HH:mm')}
            </Descriptions.Item>
            <Descriptions.Item label="Order Date">
              {dayjs(order.dateCreated).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="Customer">
              {order.user?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Outlet">
              {order.outlet?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Items">
              {order.orderItems?.map(item => (
                <Text key={item.id}>
                  {item.foodItem?.name} - Quantity: {item.quantity}
                  <br />
                </Text>
              ))}
            </Descriptions.Item>
          </Descriptions>
        )
      )}
    </PageLayout>
  )
}
