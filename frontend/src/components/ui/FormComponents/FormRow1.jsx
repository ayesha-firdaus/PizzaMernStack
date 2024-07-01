import React from 'react'
import Label from './Label'
import styled from 'styled-components'

const StyledFormRow=styled.div`
display: grid;
grid-template-columns: 20rem 1.5fr 1fr;
gap: 1.5rem;
justify-content: space-between;
align-items: center;

padding-bottom: 0.2rem;
&:last-child
{
  border: none;
}

`


;

const Error=styled.p`
font-size: 1.2rem;
font-weight: 400;

text-align: center;
color: #bc4749;

`
export default function FormRow({title="",error="",children,labelColor=""}) {
  console.log(error)
  return (
    <StyledFormRow >
    <Label color={labelColor}>{title}</Label>
   
   {children}
    {error&&<Error> {error}</Error>}
   
    
</StyledFormRow>
  )
}
