import { useClerk } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Text,
} from 'recharts'
import Loader from './Loader'

interface DataType {
  name: string
  portfolio_value: number
}

const StockAreaChart = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DataType[]>([])
  const [has, setHas] = useState(false)

  const { session, user } = useClerk()

  useEffect(() => {
    const fetchData = async (token: string | null) => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.levelingfinance.com/api/user/${user?.primaryPhoneNumber?.phoneNumber}/stocks/portfolio-history`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const json = await response.json()
        const transformedData = transformData(json)
        setData(transformedData)
        setHas(true)
      } catch (error) {
        console.error('Fetch error:', error)
        setHas(false)
      } finally {
        setLoading(false)
      }
    }

    const transformData = (data: any[]) => {
      return data.map((item) => ({
        name: formatDate(item.date),
        portfolio_value: item.portfolio_value,
      }))
    }

    session?.getToken().then((x) => {
      fetchData(x)
    })
  }, [session, user])

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const daySuffix = getDaySuffix(day)
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
    })

    return `${formattedDate.slice(0, -2)} ${day}${daySuffix} '${formattedDate.slice(-2)}`
  }

  const getDaySuffix = (day: number) => {
    if (day >= 11 && day <= 13) return 'th'
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const CustomizedXAxisTick = ({ x, y, payload }: any) => {
    const date = new Date(payload.value)
    console.log(date)
    // const isJanuary = date.getMonth() === 0
    const dateString = payload.value.toString().slice(0, -8)
    const isJanuary = dateString.includes('Jan')
    return (
      <Text
        x={x}
        y={isJanuary ? y + 12 : y + 10}
        textAnchor="middle"
        verticalAnchor="start"
        fontWeight={isJanuary ? '700' : 'normal'}
        fontStyle={isJanuary ? 'italic' : 'normal'}
        fill={isJanuary ? '#8884d8' : '#666'}
        fontSize={isJanuary ? 18 : 18}
      >
        {!isJanuary
          ? dateString
          : '20' + payload.value.toString().slice(11, 13)}
      </Text>
    )
  }

  if (loading) return <Loader />

  return (
    <ResponsiveContainer width="100%" height={450}>
      <AreaChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={({ x, y, payload }) => (
            <CustomizedXAxisTick x={x} y={y} payload={payload} />
          )}
        />
        <YAxis />
        <Tooltip
          label="Portfolio Value"
          formatter={(value) => `$${Number(value).toFixed(2)}`}
        />
        <Area
          type="monotone"
          dataKey="portfolio_value"
          fill="#8884d8"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default StockAreaChart
