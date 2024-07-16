// pages/index.js
'use client'
import { useState } from 'react'
import HeaderDash from './../../../components/HeaderDash';
import Sidebar from './../../../components/Sidebar';
import OverviewDashboard from './../../../components/OverviewDash';
import Leaderboard from './../../../components/Leaderboard';
import Classes from './../../../components/Classes';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 bg-cover">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col xl:pl-72">
        <HeaderDash setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <OverviewDashboard />
          <Leaderboard />
          <Classes />
          
        </main>
      </div>
    </div>
  )
}
