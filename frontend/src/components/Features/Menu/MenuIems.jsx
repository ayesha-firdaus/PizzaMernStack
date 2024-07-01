import React from 'react'
import styled,{css} from 'styled-components';
import { addCart, getTotalQuantity } from '../Cart/CartSlice';
import { useDispatch,useSelector } from 'react-redux';
import {getQunatityById} from "../Cart/CartSlice";
import UpdateItem from '../Cart/UpdateItem';
import useDelete from '../Pizza/useDelete';
import { deletePizza } from '../Cart/CartSlice';
const ItemsContainer=styled.div`
display:grid;
grid-template-columns: 45fr 55fr;
margin-bottom: 2rem;

`;
const Title=styled.h3`
font-size:1.5rem;
color:#EC5800;
font-weight:400;
margin-bottom:0.5rem;
`
const Description=styled.p`
font-size:1rem;
letter-spacing:2.5px;
font-style:italic;
margin-bottom:1rem;`
 
 const Price=styled.p`
 font-size:1.2rem;
 margin-bottom:1rem;`

 const Button=styled.button`
 border:none;
 padding:0.4rem 1rem;
 font-size:1.2rem;
 color:${(props=>props.color)};
 background-color:${(props=>props.backgroundColor)};
 border-radius:7px;


 &:hover{
background-color:${(props=>props.hover)};
}
 `
const Image = styled.div`
display: flex;
justify-content: center;
align-items: center;


 `

const Img=styled.img` 
display:block;
width:9rem;
aspect-ratio: 2/2;
object-fit: cover;
object-position: center;
transform: scale(1.5) translateX(-7px);
border-radius:9px;
padding: 0.2rem;
margin-bottom: 2rem;
  ${(props) =>
    props.SoldOut === true &&
    css`
      opacity: 0.8;
      filter: grayscale();
    `}
`
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
 const ButtonGroup = styled.div`
 display: flex;
 align-items:center;
 gap: 2rem;
 justify-content: center;`
export default function MenuIems({item}) {
  const dispatch=useDispatch();

    const {name,ingredients,price,photoUrl,SoldOut,id}=item;
   const quantity=useSelector(getQunatityById(id));
   const totalquantity=useSelector(getTotalQuantity);
   console.log(quantity,totalquantity)
function addCartHandler()
 {
    
     dispatch(addCart({id,items:item}))

 }
  return (
    <ItemsContainer>
    <Image>
        <Img SoldOut={SoldOut} src={photoUrl} />
        </Image>
        <div>
            <Title>{name}</Title>
            <Description>{ingredients}</Description>
            <Price>ETH {price}</Price>
            <div>
               {SoldOut?<Button color={"#f8f9fa"} backgroundColor={"#adb5bd"} hover={"#8d99ae"}>Sold Out</Button>:
               (quantity===0)?<Button color={"#F5F5DC"} backgroundColor={"#FF7F50"} hover={"#d44f00"} onClick={addCartHandler} >Add to cart</Button>:<ButtonGroup>
               <UpdateItem id={id} quantity={quantity}/>
               <DeleteButton  onClick={()=>dispatch(deletePizza(id))}>Delete</DeleteButton>
               </ButtonGroup>}
            
            </div>
        </div>
    </ItemsContainer>
  )
}
