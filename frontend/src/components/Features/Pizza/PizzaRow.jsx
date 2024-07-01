import React from 'react'
import Table from '../../ui/Table'
import {
   HiTrash,HiPencil
  } from "react-icons/hi2";
  import Modal from '../../ui/Modal';
import styled,{css} from 'styled-components';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row.';
import PizzaForm from './PizzaForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import useDelete from './useDelete';
const Img=styled.img`
display:block;
width:5.2rem;
aspect-ratio: 2/2;
object-fit: cover;
object-position: center;
transform: scale(1.5) translateX(-7px);
border-radius:4px;
padding: 0.2rem;
${(props) =>
    props.SoldOut === true &&
    css`
      opacity: 0.8;
      filter: grayscale();
    `}

`
const Ingredients=styled.div`
font-size:1.2rem;
font-style:italic;
color:#414833;
letter-spacing:1.74px;
`
const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
  color:  #FF7F50;
`;
const Button = styled.button`
  background-color: #FF7F50;
  color:#F5F5DC;
  border: none;
  border-radius: 47%;
  padding: 0.7rem;
  display: flex;

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
const Rows=styled.div`
display: flex;
gap:0.5rem;
`;
export default function PizzaRow({pizza}) {
  const {isDeleting,deletePizza}=useDelete();
    const {ingredients,name,price,photoUrl,SoldOut,_id}=pizza;

  return (
    <Table.Row role="row">
   <Img SoldOut={SoldOut} src={photoUrl}/>
   <Heading type="subheading" as="p" color='#6B3215'>{name}</Heading>
   <Ingredients>{ingredients}</Ingredients>
   <Price>{price} Eth</Price>
   <Heading type="subheading" as="p" color='#333d29'>{SoldOut?"True":"False"}</Heading>
   <Rows>
   <Modal>
    <Modal.Open opens="edit">
    <Button><HiPencil /></Button>
    </Modal.Open>
    <Modal.Window background="#f6f6e0" color="#EC5800" width="60vw" name="edit" >
      <PizzaForm PizzatoEdit={pizza}  />
    </Modal.Window>
  
    <Modal.Open opens="delete">
    <Button><HiTrash /></Button>
    </Modal.Open>
    <Modal.Window background={"#f6f6e0"} name="delete" color="#EC5800">
      <ConfirmDelete isLoading={isDeleting} resource='Pizza'  fn={deletePizza} id={_id} />
    </Modal.Window>
    </Modal>
    </Rows> </Table.Row>)
  
}
