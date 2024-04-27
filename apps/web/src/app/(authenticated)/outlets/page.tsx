'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Avatar, Spin } from 'antd'
import { ShopOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BrowseOutletsPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [outlets, setOutlets] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchOutlets = async () => {
      setLoading(true)
      try {
        const outletsFound = await Api.Outlet.findMany({ includes: ['owner'] })
        setOutlets(outletsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch outlets', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchOutlets()
  }, [])

  const handleOutletClick = id => {
    router.push(`/outlet/${id}`)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Browse Food Outlets</Title>
        <Text type="secondary">
          Select an outlet to view their menu and place an order.
        </Text>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {loading ? (
            <Spin size="large" />
          ) : (
            outlets?.map(outlet => (
              <Col
                key={outlet.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                onClick={() => handleOutletClick(outlet.id)}
              >
                <Card
                  hoverable
                  cover={
                    <Avatar
                      size={128}
                      icon={<ShopOutlined />}
                      src={outlet.profilePhotoUrl}
                    />
                  }
                >
                  <Card.Meta
                    title={outlet.name}
                    description={`${outlet.address}`}
                  />
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    </PageLayout>
  )
}
