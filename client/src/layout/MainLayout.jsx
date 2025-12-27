import Navbar from '@/components/Navbar'
import Chatbot from '@/pages/Chatbot'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <div className='flex-1'>
            <Outlet/>
            <Chatbot />
        </div>
    </div>
  )
}
export default MainLayout