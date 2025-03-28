import { useClerk } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'
import Loader from './Loader'

interface tPieData {
  name: any
  value: any
}

const StockPieChart: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [pieData, setPieData] = useState<tPieData[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const { session, user } = useClerk()

  useEffect(() => {
    const fetchData = async (token: any) => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.levelingfinance.com/api/user/${user?.primaryPhoneNumber?.phoneNumber}/stocks/current-value`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        const json = await response.json()
        const transformedPieData = transformPieData(json)
        setPieData(transformedPieData)
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    session?.getToken().then((x) => {
      return fetchData(x)
    })
  }, [session, user?.primaryPhoneNumber?.phoneNumber])

  const transformPieData = (data: any[]) => {
    return data.map((item) => ({
      name: item.ticker,
      value: item.current_value,
    }))
  }

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`$${value.toFixed(2)}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  if (loading) return <Loader />

  return (
    <ResponsiveContainer width="100%" height={450}>
      <PieChart width={600} height={600}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default StockPieChart
