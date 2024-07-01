import styled from "styled-components";
import Spinner from "../../ui/Spinner"
const StyledDashboardLayout=styled.div`
display: grid;
grid-template-columns:1fr 1fr 1fr 1fr;
grid-template-rows:auto 34rem auto;
gap:2.4rem;
`
import React from 'react'
import useRecentOrders from "../../pages/useRecentOrders";
import Stats from "./Stats";
import SalesCharts from "./SalesCharts";
import DurationCharts from "./DurationCharts";
import Activity from "./Activity";


export default function DashboardLayout() {
  const { isLoading,data, error,numDays}=useRecentOrders();
  if(isLoading)
    {
      <Spinner />
    }
  const order=data?.data?.data;
  const orderConfirmed=order?.map(el=>el.status==="confirmed");
  return (
    <StyledDashboardLayout>
<Stats Order={data?.data?.data} orderConfirmed={orderConfirmed} />
   {/* <TodayActivity /> */}<Activity />
  <DurationCharts confirmedOrder={orderConfirmed} />
  <SalesCharts orders={order} numDays={numDays} />
    </StyledDashboardLayout>
  )
}
