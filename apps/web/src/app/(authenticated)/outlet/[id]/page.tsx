'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Image, List } from 'antd'
import { QrcodeOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function OutletDetailsPage() {
  const router = useRouter()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [outlet, setOutlet] = useState(null)

  useEffect(() => {
    const fetchOutletDetails = async () => {
      try {
        const outletDetails = await Api.Outlet.findOne(id, {
          includes: ['foodItems', 'owner'],
        })
        setOutlet(outletDetails)
      } catch (error) {
        enqueueSnackbar('Failed to fetch outlet details', { variant: 'error' })
      }
    }

    fetchOutletDetails()
  }, [id])

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Outlet Details</Title>
        <Text type="secondary">
          Here you can view the details of the selected food outlet.
        </Text>

        {outlet && (
          <Card
            title={outlet.name}
            extra={<a onClick={() => router.push('/outlets')}>Back to list</a>}
            style={{ marginTop: '20px' }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Image
                  width={200}
                  src={
                    outlet.profilePhotoUrl || 'https://via.placeholder.com/200'
                  }
                  alt="Outlet Profile"
                />
              </Col>
              <Col span={16}>
                <List>
                  <List.Item>
                    <List.Item.Meta
                      title="Address"
                      description={outlet.address}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title="Owner"
                      description={outlet.owner?.name || 'N/A'}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title="QR Code for Payment"
                      description={
                        <QrcodeOutlined style={{ fontSize: '24px' }} />
                      }
                    />
                  </List.Item>
                </List>
              </Col>
            </Row>
            <Title level={4}>Available Food Items</Title>
            <List
              dataSource={outlet.foodItems}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={item.name}
                    description={`Price: $${item.price.toFixed(2)}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
