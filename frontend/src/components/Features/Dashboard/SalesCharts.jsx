import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {AreaChart,Area, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts"
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalSales: 480, extrasSales: 20 },
  { label: "Jan 10", totalSales: 580, extrasSales: 100 },
  { label: "Jan 11", totalSales: 550, extrasSales: 150 },
  { label: "Jan 12", totalSales: 600, extrasSales: 50 },
  { label: "Jan 13", totalSales: 700, extrasSales: 150 },
  { label: "Jan 14", totalSales: 800, extrasSales: 150 },
  { label: "Jan 15", totalSales: 700, extrasSales: 200 },
  { label: "Jan 16", totalSales: 650, extrasSales: 200 },
  { label: "Jan 17", totalSales: 600, extrasSales: 300 },
  { label: "Jan 18", totalSales: 550, extrasSales: 100 },
  { label: "Jan 19", totalSales: 700, extrasSales: 100 },
  { label: "Jan 20", totalSales: 800, extrasSales: 200 },
  { label: "Jan 21", totalSales: 700, extrasSales: 100 },
  { label: "Jan 22", totalSales: 810, extrasSales: 50 },
  { label: "Jan 23", totalSales: 950, extrasSales: 250 },
  { label: "Jan 24", totalSales: 970, extrasSales: 100 },
  { label: "Jan 25", totalSales: 900, extrasSales: 200 },
  { label: "Jan 26", totalSales: 950, extrasSales: 300 },
  { label: "Jan 27", totalSales: 850, extrasSales: 200 },
  { label: "Jan 28", totalSales: 900, extrasSales: 100 },
  { label: "Jan 29", totalSales: 800, extrasSales: 300 },
  { label: "Jan 30", totalSales: 950, extrasSales: 200 },
  { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
  { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
  { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
  { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
  { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
  { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
  { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
];

const isDarkMode = true;
const colors = isDarkMode
  ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
  : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };
    import React from 'react'
import Heading from "../../ui/Heading";
import { eachDayOfInterval, format, isDate, isSameDay, subDays } from "date-fns";
    
    export default function SalesCharts({orders,numDays}) {
     const allDate=eachDayOfInterval({
            start:subDays(new Date(),numDays-1),
            end:new Date()
        })
        const data=allDate.map(date=>{
            return {
                label:format(date,"MMM dd"),
                totalSales:orders?.filter(order=>isSameDay(date,new Date(order.created_at))).reduce((acc,cur)=>cur.totalPrice+acc,0)

            }
        })
        console.log(data)

      return (
        <StyledSalesChart>
        <Heading as="h3" type="h3" color="#d44f00">Sales from {format(allDate.at(0),"MMM dd yyyy")} &mdash;{" "} {format(allDate.at(-1),"MMM dd yyyy")}{" "}</Heading>
        <ResponsiveContainer  height={300} width={"100%"}>
        <AreaChart data={data}>
        <XAxis dataKey={"label"} tick={{fill:"#EC5800"}} tickLine={{stroke:"#ddddc6"}} />
        <YAxis unit="Wei" tick={{fill:"#EC5800"}} tickLine={{stroke:"#ddddc6"}} /> 
        <CartesianGrid strokeDasharray={"4"}  />
        <Tooltip contentStyle={{backgroundColor:"#f7f7e3",color:"#EC5800"}} />
        <Area dataKey="totalSales" type="monotone" stroke="#ddddc6" fill="#b79ced" strokeWidth={2} name="Total Sales" unit="Wei" />

</AreaChart>     
</ResponsiveContainer>
   </StyledSalesChart>
      )
    }
    