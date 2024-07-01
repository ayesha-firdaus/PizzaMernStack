import React from 'react'
import { NavLink } from 'react-router-dom'
import { HiHomeModern } from "react-icons/hi2";
import styled from 'styled-components';
const NavList=styled.ul`
display: flex;
flex-direction:column;
gap: 1.5rem;`
const StyledNavLink=styled(NavLink)`
 &:link,
 &:visited {
    display: flex;
    align-items:center;
    gap: 1.2rem;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    background-color: #ff6b6b;
    color: #F5F5DC;
    border-radius: 7px;
 }
 &:hover,&:active,&.active:link,&.active:visited{
    color: #F5F5DC;
    background-color:#FF7F50 ;
    border-radius: 12px;
   
 }
`
export default function MainNav() {
  return (
    <nav>
         <NavList>
        <StyledNavLink to="/dashboard"><HiHomeModern /><span>Home</span></StyledNavLink>
        <StyledNavLink to="/allorder"><HiHomeModern /><span>Orders</span></StyledNavLink>
        <StyledNavLink to="/pizza"><HiHomeModern /><span>Pizza</span></StyledNavLink>
        <StyledNavLink to="/user"><HiHomeModern /><span>User</span></StyledNavLink>
  
       </NavList>
    </nav>
  )
}
