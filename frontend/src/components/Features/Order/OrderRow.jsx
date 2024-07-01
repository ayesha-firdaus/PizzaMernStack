import React from 'react';
import Table from '../../ui/Table';
import styled from 'styled-components';

const Name = styled.div`
  font-size: 1.2rem;
  font-style: italic;
  color: #414833;
  letter-spacing: 1.74px;
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
  color: #ff7f50;
`;

export default function OrderRow({ order, curr }) {
  // Function to format date and time
  const formatDate = (dateTimeString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTimeString).toLocaleDateString('en-US', options);
  };

  // Format date and time
  const formattedDate = formatDate(order.orderDate);

  // Generate name string
  const name = order.cart.map(el => el.name).join(' ');

  return (
    <Table.Row>
      <Price>{curr+1}</Price>
      <Name>{name}</Name>
      <Price>{order.status}</Price>
      <Price>{order.isPaid ? "paid" : "not paid"}</Price>
      <Price>{order.totalPrice.toFixed(1)}</Price>
      <Name>{formattedDate}</Name> {/* Render formatted date */}
    </Table.Row>
  );
}


