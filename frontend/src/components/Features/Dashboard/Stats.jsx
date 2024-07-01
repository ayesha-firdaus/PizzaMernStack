import React from 'react'
import Stat from './Stat';
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from "react-icons/hi2"
export default function Stats({Order,orderConfirmed}) {
    const numOrder=Order?.length;
     const numSales=Order?.reduce((acc,curr)=>curr.totalPrice+acc,0)
     const occupancyRates=Order?.length*100/20
  return (
    <>
      <Stat backgroundcolor={"#f2d492"} color={"#343434"} icon={<HiOutlineBriefcase />} title="Order"  value={numOrder}/>
      <Stat backgroundcolor={"#b79ced"} color={"#f7f7e3"} icon={<HiOutlineBanknotes />} title="Sales"  value={`${numSales} wei`}/>
        <Stat backgroundcolor={"#cdeac0"} color={"#008080"} icon={<HiOutlineCalendarDays />} title="Sold"  value={orderConfirmed?.length}/>
      
        <Stat backgroundcolor={"#a9d6e5"} color={"#40798c"} icon={<HiOutlineChartBar />} title="Order"  value={`${occupancyRates}%`}/>
      
        
    </>
  )
}
