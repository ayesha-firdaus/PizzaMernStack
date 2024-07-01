import React from 'react';
import UpdateItem from './UpdateItem';
import styled from 'styled-components';
import { deletePizza, getTotalPrice } from './CartSlice';
import { useDispatch,useSelector } from 'react-redux';


const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1rem;
`;



const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display:block;
width:5rem;
aspect-ratio: 2/2;
object-fit: cover;
object-position: center;
transform: scale(1.5) translateX(-7px);
border-radius:9px;
padding: 0.2rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h4`
  font-size: 1.2rem;
  color: #ec5800;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  letter-spacing: 0.5px;
  font-style: italic;
  color: #38302e;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #38302e;
  margin-bottom: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #ff4c4c;
  }
`;

export default function CartItem({ item }) {
  const { id, name, price, totalprice, quantity, photoUrl, ingredients } = item;
const totalAmount=useSelector(state=>getTotalPrice(state));
console.log(Number(totalAmount.toFixed(1)));
const dispatch=useDispatch();
  return (
    <CartContainer>
      
        <ImageContainer>
          <img src={photoUrl} alt={name} />
        </ImageContainer>
        <TextContainer>
          <Title>{name}</Title>
          <Description>{ingredients}</Description>
          <Price>{Number(totalprice.toFixed(1))} Wei</Price>
        </TextContainer>
     
      <div>
        <UpdateItem id={id} quantity={quantity} />
        </div>
        <div>
        <DeleteButton onClick={()=>dispatch(deletePizza(id))}>Delete</DeleteButton>
        </div>

      
    </CartContainer>
  );
}
