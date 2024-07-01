import React from 'react'
import Heading from './Heading'
import Row from './Row.'
import Button from './Button'
import useDelete from '../Features/Pizza/useDelete'
import styled from 'styled-components'

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: #e66060;
    margin-bottom: 1.2rem;
    font-size: 1.6rem;
    letter-spacing: 1.75px;
  
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
export default function ConfirmDelete({resource="",onClose,fn,isLoading,id}) {
    
  return (
    <StyledConfirmDelete>
        <Heading type="h2" as="h2">Confirm Delete,{resource}</Heading>
        <p>  Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.</p>
        <div>
         <Button size={"small"} backgroundColor="#FF7F50" color="#F5F5DC" backgroundHover="#EC5800" onClick={()=>onClose?.()}>Cancel</Button>
         <Button size={"small"} backgroundColor="#ff6b6b" color="#F5F5DC" backgroundHover="#e66060" onClick={()=>{fn(id),{ onSuccess: () => { onClose?.();  }}}} disabled={isLoading}>Delete</Button>
        </div>
 </StyledConfirmDelete>
  )
}
