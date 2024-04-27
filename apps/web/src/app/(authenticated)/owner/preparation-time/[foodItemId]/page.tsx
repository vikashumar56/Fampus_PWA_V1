'use client'

import { useEffect, useState } from 'react'
import { Typography, Form, InputNumber, Button, Card, Space } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AdjustPreparationTimePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [foodItem, setFoodItem] = useState(null)
  const [preparationTime, setPreparationTime] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userId) {
      router.push('/home')
      return
    }

    const fetchFoodItem = async () => {
      try {
        const foodItemData = await Api.FoodItem.findOne(params.foodItemId, {
          includes: ['preparationTimes', 'outlet'],
        })
        setFoodItem(foodItemData)
        if (foodItemData.preparationTimes?.length > 0) {
          setPreparationTime(foodItemData.preparationTimes[0])
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch food item details', {
          variant: 'error',
        })
      }
    }

    fetchFoodItem()
  }, [params.foodItemId, userId, router])

  const handleUpdatePreparationTime = async values => {
    if (!preparationTime) return

    setLoading(true)
    try {
      const updatedPreparationTime = await Api.PreparationTime.updateOne(
        preparationTime.id,
        {
          timeRequired: values.timeRequired,
        },
      )
      setPreparationTime(updatedPreparationTime)
      enqueueSnackbar('Preparation time updated successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to update preparation time', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', padding: 24 }}
      >
        <Title level={2}>
          <ClockCircleOutlined /> Adjust Preparation Time
        </Title>
        <Text>
          Adjust the preparation time for the selected food item to manage
          customer expectations.
        </Text>
        {foodItem && (
          <Card title={`Food Item: ${foodItem.name}`} bordered={false}>
            <Form
              initialValues={{ timeRequired: preparationTime?.timeRequired }}
              onFinish={handleUpdatePreparationTime}
              layout="inline"
            >
              <Form.Item
                name="timeRequired"
                label="Preparation Time (minutes)"
                rules={[
                  {
                    required: true,
                    message: 'Please input the preparation time!',
                  },
                ]}
              >
                <InputNumber min={1} max={120} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Update Time
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </Space>
    </PageLayout>
  )
}
