// pages/index.js
'use client'
import { useState } from 'react'
import HeaderDash from './../../../components/HeaderDash'
import Sidebar from './../../../components/Sidebar'
import OverviewDashboard from './../../../components/OverviewDash'
import Leaderboard from './../../../components/Leaderboard'
import Classes from './../../../components/Classes'
import { useClerk } from '@clerk/nextjs'
import StockAreaChart from '@/components/StockAreaChart'
import StockPieChart from '@/components/StockPieChart'
import StockPurchaseForm from '@/components/StockPurchaseForm'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const clerk = useClerk()
  return (
    <div className="flex h-screen bg-white bg-cover dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col xl:pl-72">
        <HeaderDash
          setSidebarOpen={setSidebarOpen}
          role={String(clerk.user?.unsafeMetadata['role'])}
        />
        {clerk.user?.unsafeMetadata['role'] === 'teacher' ? (
          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
            <OverviewDashboard />
            <Leaderboard />
            <Classes />
          </main>
        ) : (
          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <StockAreaChart />
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <StockPieChart />
              </div>
            </div>
            <div className="mt-6 w-1/2 content-center items-center justify-center px-0">
              <StockPurchaseForm />
            </div>
          </main>
        )}
      </div>
    </div>
  )
}
