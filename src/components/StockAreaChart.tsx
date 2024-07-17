import { useClerk } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Text,
} from 'recharts';
import Loader from './Loader';

interface DataType {
  name: string;
  close: number;
}

const StockAreaChart = () => {
  // const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);
  const [has, setHas] = useState(false);
  
  const { session, user } = useClerk();

  useEffect(() => {
    const fetchData = async (token: string | null) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.levelingfinance.com/api/user/${user?.primaryPhoneNumber?.phoneNumber}/stocks/Msft/history/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const transformedData = transformData(json);
        setData(transformedData);
        setHas(true);
      } catch (error) {
        console.error('Fetch error:', error);
        setHas(false);
      } finally {
        setLoading(false);
      }
    };

    const transformData = (data: any[]) => {
      const now = new Date();
      const earliestDate = new Date(data[0].Date);
      const diffTime = Math.abs(now.getTime() - earliestDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      if (diffDays <= 90) {
        return data.map((item: { Date: any; Close: any; }) => ({
          name: formatDate(item.Date),
          close: item.Close,
        }));
      } else if (diffDays <= 365) {
        return data
          .filter((_: any, index: number) => index % 7 === 0)
          .map((item: { Date: any; Close: any; }) => ({
            name: formatDate(item.Date),
            close: item.Close,
          }));
      } else {
        let lastMonth = -1;
        let lastYear = -1;
        return data
          .filter((item: { Date: string | number | Date; }) => {
            const date = new Date(item.Date);
            const month = date.getMonth();
            const year = date.getFullYear();
            if (month !== lastMonth || year !== lastYear) {
              lastMonth = month;
              lastYear = year;
              return true;
            }
            return false;
          })
          .map((item: { Date: any; Close: any; }) => ({
            name: formatDate(item.Date),
            close: item.Close,
          }));
      }
    };
    session?.getToken().then((x) => {
      fetchData(x);
    });
  }, [session, user,]);


  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

    if (date.getMonth() === 0) {
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      return `${month} ${date.getFullYear()}`;
    }
    const newString =
      formattedDate.slice(0, -2) + "'" + formattedDate.slice(-2);
    return newString;
  };

  const CustomizedXAxisTick = ({ x, y, payload }:any) => {
    const date = new Date(payload.value);
    const isJanuary = date.getMonth() === 0;
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
        {!isJanuary ? payload.value.toString().slice(0, -3) : date.getFullYear()}
      </Text>
    );
  };

  if (loading) return <Loader />;

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
          label="Close"
          formatter={(value) => `$${Number(value).toFixed(2)}`}
        />
        <Area
          type="monotone"
          dataKey="close"
          fill="#8884d8"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StockAreaChart;
