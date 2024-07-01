import styled, { css } from "styled-components";
import {
  HiTrash,HiPencil
 } from "react-icons/hi2";
 import Modal from "../../ui/Modal";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid #ddddc6;

  &:first-child {
    border-top: 1px solid #ddddc6;
  }
`;
const Status = styled.div`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  ${(props) =>
    props.status === "confirmed" &&
    css`
      background-color: #3b82f6;
      color: #f7f7e3;
    `}

  ${(props) =>
    props.status === "delivered" &&
    css`
      background-color: #b79ced;
      color: #f7f7e3;
    `}
`;
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
const Paid = styled.div`
  font-family: 'Sono';
  font-weight: 600;
  color: #d44f00;
`;
const Guest = styled.div`
  font-weight: 500;
`;
import React from 'react'
import Button from "../../ui/Button";
import ConfirmDelivered from "../../ui/ConfirmDelivered";


export default function TodayItem({a}) {
console.log(a)

const {_id,status,totalPrice,isPaid,cart}=a;
const name = cart.map(el => el.name).join(' ');
  return (
    <StyledTodayItem>
      <Status status={status}>{status}</Status>
     
      <Price>{totalPrice.toFixed(2)}</Price>
      <Paid>{isPaid?"TRUE":"FALSE"}</Paid>
      <Modal> 
      <Modal.Open opens="edit"> 
      <Button
            backgroundColor="#FF7F50"
            color="#f7f7e3"
            backgroundHover="#EC5800"
            size="small"
            
          >
            <HiPencil />
          </Button>
          </Modal.Open>
          <Modal.Window background="#f6f6e0" color="#EC5800"  name="edit" >
            <ConfirmDelivered id={_id} />
          </Modal.Window></Modal>
    </StyledTodayItem>
  )
}
