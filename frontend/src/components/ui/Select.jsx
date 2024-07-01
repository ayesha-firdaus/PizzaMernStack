import styled from "styled-components";
import { useSearchParams } from 'react-router-dom'
const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "#F5F5DC"
        : ""};
  border-radius: var(--border-radius-sm);
  background-color: #F5F5DC;
  font-weight: 500;

`;
import React from 'react'

export default function Select({options,onChange,value,...props}) {
 
  return (
    
    <StyledSelect value={value} {...props} onChange={onChange}>
    {options.map(option=><option value={option.value} >{option.label}</option>)}
    </StyledSelect>
    
  )
}
