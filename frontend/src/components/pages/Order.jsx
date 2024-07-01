import React from 'react'
import Container from '../ui/Container'
import Heading from '../ui/Heading'
import Table from '../ui/Table'
import useOrder from '../Features/Order/useOrders'
import OrderRow from '../Features/Order/OrderRow'
import Paginate from "../ui/Paginate";
import Row from '../ui/Row.'; // Corrected import path
import OrderTableOperation from '../Features/Order/OrderTableOperation';
export default function Order() {
  const {isLoading,data,error,totalCount}=useOrder();
  return (
    <Container>
     <Row type="horizontal">
    <Heading type="h2" color="#d44f00" >Your Order</Heading>
    <OrderTableOperation />
    </Row>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 2fr">
   <Table.Header>
    <div>Sl</div>
    <div>Name</div>
    <div>Status</div>
    <div>isPaid</div>
    <div>Total Price</div>
    <div>Date</div>
</Table.Header>
<Table.Body data={data?.data?.data} render={(order,curr)=><OrderRow order={order} curr={curr} />} />
   </Table>
   <Table.Footer>
          <Paginate count={totalCount} />
        </Table.Footer>

    </Container>

  )
}
