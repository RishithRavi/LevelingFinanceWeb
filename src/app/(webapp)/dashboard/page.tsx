// pages/index.js
'use client'
import { useState } from 'react'
import HeaderDash from './../../../components/HeaderDash';
import Sidebar from './../../../components/Sidebar';
import OverviewDashboard from './../../../components/OverviewDash';
import Leaderboard from './../../../components/Leaderboard';
import Classes from './../../../components/Classes';
import { useClerk } from '@clerk/nextjs';
import StockAreaChart from '@/components/StockAreaChart';
import StockPieChart from '@/components/StockPieChart';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const clerk = useClerk()
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 bg-cover">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col xl:pl-72">
        <HeaderDash setSidebarOpen={setSidebarOpen} role={clerk.user?.unsafeMetadata['role']} />{
          clerk.user?.unsafeMetadata['role'] === 'teacher' ?
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <OverviewDashboard />
          <Leaderboard />
          <Classes />
          
        </main> :  <div style={{marginTop:75}}>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px' }}>
      <div style={{ width: '100%', height: '100%' }}>
        <StockAreaChart />
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        <StockPieChart />
      </div>
    </div>
    </div>
        }
      </div>
    </div>
  )
}
