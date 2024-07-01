import React from 'react'
import Label from './Label'
import styled from 'styled-components'

const StyledFormRow=styled.div`
display: flex;
flex-direction: column;
gap: 1.5em;
justify-content: space-between;
align-items: center;

`


const InputContainer=styled.div`
display: flex;
flex-direction: column;
gap: 0.5rem;
`
const Error=styled.p`
font-size: 1.8rem;
font-weight: 500;

text-align: center;
color: #bc4749;

`
export default function FormRow({title="",error="",children,labelColor=""}) {
  console.log(error)
  return (
    <StyledFormRow >
    <Label color={labelColor}>{title}</Label>
   <InputContainer>
   {children}
    {error&&<Error> {error}</Error>}
    </InputContainer>
    
</StyledFormRow>
  )
}
