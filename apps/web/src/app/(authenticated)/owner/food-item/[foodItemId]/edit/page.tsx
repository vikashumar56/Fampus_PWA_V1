'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Switch, Typography } from 'antd'
import { EditOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EditFoodItemPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [foodItem, setFoodItem] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const item = await Api.FoodItem.findOne(params.foodItemId, {
          includes: ['outlet'],
        })
        setFoodItem(item)
        form.setFieldsValue(item)
      } catch (error) {
        enqueueSnackbar('Failed to fetch food item details.', {
          variant: 'error',
        })
      }
    }

    if (params.foodItemId) {
      fetchFoodItem()
    }
  }, [params.foodItemId, form])

  const handleFormSubmit = async values => {
    try {
      await Api.FoodItem.updateOne(params.foodItemId, values)
      enqueueSnackbar('Food item updated successfully.', { variant: 'success' })
      router.push(`/outlet/${foodItem.outletId}`)
    } catch (error) {
      enqueueSnackbar('Failed to update food item.', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2}>
          <EditOutlined /> Edit Food Item
        </Title>
        <Text>Edit the details of your food item below.</Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            isAvailable: true,
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of the food item!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="isAvailable"
            label="Is Available"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Food Item
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
