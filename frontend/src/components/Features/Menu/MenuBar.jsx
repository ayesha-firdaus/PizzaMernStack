import React from 'react'
import styled from 'styled-components'
import Container from '../../ui/Container'
import data from "../../../Data/data.json"
import MenuIems from './MenuIems'
import usePizza from "../Pizza/usePizza";
const Heading=styled.h3`
 text-transform: capitalize;
     display: inline-block;
     color: #2b2d42;
     font-weight: 500;
     font-size: 3.2rem;
     border-bottom: 2px solid currentColor;
     border-top: 2px solid currentColor;
     margin-bottom: 0.5rem;


`
const SubHeading=styled.p`
color: #253237;
letter-spacing: 1.5px;
line-height: 1.4;
font-weight: 400;
font-size: 1.5rem;
margin-bottom: 2rem;`
const PizzaContainer=styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 1rem;
    align-items: center;
    justify-content: center;

`
export default function MenuBar() {
  const {isLoading,pizzas,error}=usePizza();
 
  return (
    <Container>
   
        <Heading>Menu Bar</Heading>
        <SubHeading>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious</SubHeading>
      <PizzaContainer>
{pizzas?.data?.map(item=><MenuIems key={item} item={item} />
    
)}
      </PizzaContainer>
    </Container>
  )
}
