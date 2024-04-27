'use client'

import { Button, Form, Input, InputNumber, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddFoodItemPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const handleSubmit = async (values: {
    name: string
    description: string
    price: number
  }) => {
    if (!params.outletId) {
      enqueueSnackbar('Outlet ID is missing.', { variant: 'error' })
      return
    }

    try {
      const newFoodItem = await Api.FoodItem.createOneByOutletId(
        params.outletId,
        {
          name: values.name,
          description: values.description,
          price: values.price,
          isAvailable: true,
        },
      )
      enqueueSnackbar('Food item added successfully!', { variant: 'success' })
      router.push(`/owner/outlet/${params.outletId}`)
    } catch (error) {
      enqueueSnackbar('Failed to add food item.', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2}>Add New Food Item</Title>
        <Text type="secondary">
          Fill in the details below to add a new food item to your outlet's
          menu.
        </Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="name"
            label="Food Item Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of the food item!',
              },
            ]}
          >
            <Input placeholder="Enter food item name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input a description!' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber
              min={0}
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusCircleOutlined />}
            >
              Add Food Item
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
