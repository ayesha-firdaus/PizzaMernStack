import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import Cartitem from './Cartitem';
import isLoggedIn from '../Auth/isLoggedIn';
import { getCart, getTotalPrice } from './CartSlice';
import OrderForm from '../Order/OrderForm';
import Modal from '../../ui/Modal';

const Heading = styled.h3`
  text-transform: capitalize;
  color: #2b2d42;
  font-weight: 400;
  font-size: 3.2rem;
  margin-bottom: 0.5rem;
`;

export default function CartOverview() {
  const cartitems = useSelector((state) => getCart(state));
  const [open, setOpen] = useState(false);
  const { isLoading, user, isAuth } = isLoggedIn();
  const totalAmount = useSelector((state) => getTotalPrice(state));

  return (
    <div>
      <Heading>{totalAmount!==0?`Welcome ${user?.name}, Your Cart`:`Your Cart is Empty ${user?.name}`}</Heading>
      {cartitems?.map((item) => (
        <Cartitem key={item.id} item={item} />
      ))}
      {totalAmount===0?"":
      <Modal>
        <Modal.Open opens={"login"}>
          <Button
            size="medium"
            color="#F5F5DC"
            backgroundHover="#e66060"
            backgroundColor="#ff6b6b"
            onClick={() => setOpen((prev) => !prev)}
          >
            Order ({Number(totalAmount.toFixed(1))}) Wei
          </Button>
        </Modal.Open>
        <Modal.Window name={"login"} background={"#f6f6e0"} color="#EC5800" width={"70vw"}>
          <OrderForm />
        </Modal.Window>
      </Modal>}
      <div></div>
    </div>
  );
}
