import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
const StyledAdminLayout=styled.div`
display: grid;
grid-template-columns:26rem 1fr;
grid-template-rows: auto 1fr;
height: 100vh;
`
const Main=styled.main`
padding: 4rem 4.8rem 6.4rem;
overflow: scroll;

`
const Container=styled.div`
display: flex;
max-width:120rem;
margin: 0 auto;
flex-direction:column;

gap:3.2rem;`

export default function AdminAppLayout() {
  return (
<StyledAdminLayout>
<Header />
<Sidebar />

<Main>
<Container>
  <Outlet/>
  </Container>
</Main>

</StyledAdminLayout>
  )
}
