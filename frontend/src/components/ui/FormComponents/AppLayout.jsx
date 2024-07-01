import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../utils/Navbar'
export default function AppLayout() {
  return (
 <>

    <Outlet />

 </>
  )
}
