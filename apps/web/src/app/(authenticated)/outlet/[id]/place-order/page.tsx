'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  List,
  Avatar,
  InputNumber,
  Space,
} from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function PlaceOrderPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [outlet, setOutlet] = useState<Model.Outlet | null>(null)
  const [foodItems, setFoodItems] = useState<Model.FoodItem[]>([])
  const [orderItems, setOrderItems] = useState<
    { foodItemId: string; quantity: number }[]
  >([])

  useEffect(() => {
    const fetchOutletDetails = async () => {
      try {
        const outletDetails = await Api.Outlet.findOne(params.id, {
          includes: ['foodItems'],
        })
        setOutlet(outletDetails)
        setFoodItems(outletDetails.foodItems || [])
      } catch (error) {
        enqueueSnackbar('Failed to fetch outlet details', { variant: 'error' })
      }
    }

    fetchOutletDetails()
  }, [params.id])

  const handleAddToCart = (foodItemId: string) => {
    setOrderItems(prev => {
      const existingItem = prev.find(item => item.foodItemId === foodItemId)
      if (existingItem) {
        return prev.map(item =>
          item.foodItemId === foodItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { foodItemId, quantity: 1 }]
    })
  }

  const handlePlaceOrder = async () => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to place an order', {
        variant: 'error',
      })
      return
    }

    try {
      const newOrder = await Api.Order.createOneByUserId(userId, {
        pickupTime: new Date().toISOString(),
        status: 'Pending',
        outletId: outlet!.id,
      })

      for (const item of orderItems) {
        await Api.OrderItem.createOneByOrderId(newOrder.id, {
          quantity: item.quantity,
          foodItemId: item.foodItemId,
        })
      }

      enqueueSnackbar('Order placed successfully', { variant: 'success' })
      router.push(`/order/${newOrder.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to place order', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>{outlet?.name || 'Loading...'}</Title>
          <Text type="secondary">{outlet?.address}</Text>
        </Col>
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={foodItems}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!item.isAvailable}
                  >
                    Add to Cart
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.outlet?.profilePhotoUrl} />}
                  title={item.name}
                  description={item.description}
                />
                <div>
                  <Text strong>${item.price.toFixed(2)}</Text>
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            size="large"
            onClick={handlePlaceOrder}
            disabled={orderItems.length === 0}
          >
            Place Order
          </Button>
        </Col>
      </Row>
    </PageLayout>
  )
}
