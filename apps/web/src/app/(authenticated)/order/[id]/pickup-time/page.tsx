'use client'

import React, { useState, useEffect } from 'react'
import { DatePicker, Button, Typography, Space, TimePicker } from 'antd'
import moment from 'moment'
import { ClockCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SetPickupTimePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [pickupTime, setPickupTime] = useState<moment.Moment | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSavePickupTime = async () => {
    if (!pickupTime) {
      enqueueSnackbar('Please select a pickup time before saving.', {
        variant: 'error',
      })
      return
    }

    try {
      setLoading(true)
      const formattedTime = pickupTime.toISOString()
      const updatedOrder = await Api.Order.updateOne(params.id, {
        pickupTime: formattedTime,
      })
      enqueueSnackbar('Pickup time updated successfully!', {
        variant: 'success',
      })
      router.push(`/order/${updatedOrder.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to update pickup time.', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderDetails = await Api.Order.findOne(params.id, {
          includes: ['outlet'],
        })
        if (orderDetails.pickupTime) {
          setPickupTime(moment(orderDetails.pickupTime))
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch order details.', { variant: 'error' })
      }
    }

    fetchOrderDetails()
  }, [params.id])

  return (
    <PageLayout layout="full-width">
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', padding: 24 }}
      >
        <Title level={2}>Set Pickup Time</Title>
        <Text>Please select a time you will pick up your order.</Text>
        <TimePicker
          use12Hours
          format="h:mm a"
          minuteStep={15}
          value={pickupTime}
          onChange={setPickupTime}
          suffixIcon={<ClockCircleOutlined />}
          style={{ width: '100%' }}
        />
        <Button type="primary" onClick={handleSavePickupTime} loading={loading}>
          Save Pickup Time
        </Button>
      </Space>
    </PageLayout>
  )
}
