import React from 'react'
  import Heading from '../ui/Heading'
    import Row from '../ui/Row.'
import UserTable from '../Features/User/UserTable'

    
    export default function Pizza() {
     
      return (
       <>
        <Row type="horizontal">
          <Heading type="h3" as="h3" color="#FF7F50">User</Heading>
        
        </Row>
        <Row>
          <UserTable />
        </Row>
     
       </>
      )
    }
