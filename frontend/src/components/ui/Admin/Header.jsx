import React from 'react'
import styled from 'styled-components'
import Row from '../Row.'
import Heading from '../Heading'
import isLoggedIn from '../../Features/Auth/isLoggedIn'

export default function Header() {
    const StyledHeader=styled.header`
    background-color: #f7f7e3;
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid #ddddc6;
    `
const Header=styled.header`
font-size: 1.5rem;
color:#d44f00;
text-transform: capitalize;
`
  const {isLoading,isAuth,user}=isLoggedIn();
  return (
    <StyledHeader>
      <Row type="horizontal">
        <Heading type="subheading" color="#ff6b6b">Admin Panel</Heading>
        <Header>{user.name}</Header>
      </Row>
    </StyledHeader>
  )
}
