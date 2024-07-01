import React from 'react'
import styled from 'styled-components'
import MainNav from './MainNav'
const StyledAdminLayout=styled.div`
grid-row:1/-1;
padding: 3.2rem 2.4rem;
display: flex;
border-right: 1px solid #ddddc6;
background-color: #f7f7e3;
flex-direction:column;
text-align: center;
gap:3.2rem`;

const Header=styled.h3`
font-size: 3.2rem;
font-weight: 400;
color: #EC5800;
letter-spacing:1.5px;


`
export default function Sidebar() {
  return (
    <StyledAdminLayout>
  
       <MainNav />
      </StyledAdminLayout>
  )
}
