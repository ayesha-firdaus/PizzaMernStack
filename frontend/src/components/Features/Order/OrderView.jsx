import React from 'react';
import useOrderById from './useOrderById';
import Container from '../../ui/Container';
import Heading from '../../ui/Heading';
import OrderRow from './OrderRow';
import Table from '../../ui/Table';


export default function OrderView() {
  const { isLoading, data, error } = useOrderById();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const orders = data?.data?.data;
  const totalOrders = data?.data?.total || 0; // Assuming your API returns the total number of orders

  return (
    <Container>
     
        <Heading type="h2" color="#d44f00">Your Order</Heading>
       

      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 2fr">
        <Table.Header>
          <div>Sl</div>
          <div>Name</div>
          <div>Status</div>
          <div>isPaid</div>
          <div>Total Price</div>
          <div>Date</div>
        </Table.Header>
        <Table.Body
          data={orders}
          render={(order, curr) => <OrderRow order={order} curr={curr} />}
        />
    
      </Table>
    </Container>
  );
}

