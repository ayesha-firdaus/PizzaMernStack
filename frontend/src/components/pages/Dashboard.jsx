import React from 'react'
import Row from "../ui/Row.";
import Heading from '../ui/Heading';
import DashboardLayout from '../Features/Dashboard/DashboardLayout';
import DashboardFilter from '../Features/Dashboard/DashboardFilter';

export default function Dashboard() {
  return (
    <>
    <Row type="horizontal" >
      <Heading as="h3" type="h3" color="#d44f00">Dashboard</Heading>
      <DashboardFilter />
    </Row>
    <DashboardLayout />
    </>

  )
}
