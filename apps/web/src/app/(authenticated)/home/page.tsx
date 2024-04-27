'use client'

import { Button, Row, Col, Typography, Card } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const navigateToOutlets = () => {
    router.push('/outlets')
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginTop: '50px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title>Welcome to Our Service</Title>
          <Text>
            This is the main landing page of the application where users can
            start their journey.
          </Text>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            style={{ width: '100%', textAlign: 'center' }}
            actions={[
              <Button
                type="primary"
                onClick={navigateToOutlets}
                icon={<HomeOutlined />}
              >
                Browse Outlets
              </Button>,
            ]}
          >
            <Card.Meta
              title="Outlets"
              description="Explore various outlets and their offerings."
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
