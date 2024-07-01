import React from 'react';
import { useDispatch } from 'react-redux';
import { decreaseItem, increaseItem } from './CartSlice';
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  background-color: #FF7F50;
  border: none;
  border-radius: 47%;
  padding: 0.8rem;
  display: flex;
  color: #F5F5DC;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  
  &:hover {
    background-color: #EC5800;
  
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const Quantity = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

export default function UpdateItem({ id, quantity }) {
  const dispatch = useDispatch();
   console.log(id,quantity)
  return (
    <Container>
      <Button onClick={() => dispatch(decreaseItem(id))}>
        <RiSubtractLine />
      </Button>
      <Quantity>{quantity}</Quantity>
      <Button onClick={() => dispatch(increaseItem(id))}>
        <IoMdAdd />
      </Button>
    </Container>
  );
}
