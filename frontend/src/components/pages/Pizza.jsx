import React, { useState } from 'react'
import Row from '../ui/Row.'
import Heading from '../ui/Heading'
import PizzaTable from "../Features/Pizza/PizzaTable"
import Button from '../ui/Button'
import PizzaForm from '../Features/Pizza/PizzaForm'
import Modal from '../ui/Modal'
import TableOperation from '../ui/TableOperation'
import PizzaTableOperation from '../Features/Pizza/PizzaTableOperation'

export default function Pizza() {
  const [open,setOpen]=useState(false)
  return (
   <>
    <Row type="horizontal">
      <Heading type="h3" as="h3" color="#FF7F50">Pizza</Heading>
      <PizzaTableOperation/>
      <TableOperation/>
    </Row>
    <Row>
      <PizzaTable />
    </Row>
    <Row type="vertical">
    <Modal>
      <Modal.Open >
      <Button backgroundColor="#FF7F50" color='#F5F5DC'  backgroundHover="#EC5800" size="medium" >Add Pizza</Button>
      </Modal.Open>
      <Modal.Window background="#f7f7e3" color="#EC5800" width="60vw">
      <PizzaForm />
      </Modal.Window>
    </Modal>
    
    </Row>
   </>
  )
}
