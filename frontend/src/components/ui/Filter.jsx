import React from 'react'
import styled,{css} from 'styled-components'
import {useSearchParams} from "react-router-dom"
const StyledFilter = styled.div`
  border: 1px solid #ddddc6;
  background-color: #f7f7e3;
  box-shadow: var(--shadow-sm);
  color:#d44f00;
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;
const FilterButton=styled.button`
background-color:#f7f7e3;
border:none;
color: #d44f00;
border-radius:9px;
font-weight:500;
font-size:1.4rem;
padding:0.44rem 0.8rem;
${(props)=>props.active&&css`
background-color:#ff6b6b;
color:#f7f7e3;`
}

&:hover:not(:disabled){
    background-color:#e66060;
    color:#f7f7e3
}`
export default function Filter({filterFeild="",options=[]}) {
    const [SearchParams,setSearchParams]=useSearchParams()
    const activeFilter=SearchParams.get(filterFeild)||options.at(0).value
    console.log(options.at(0).value)
   function handleClick(value){
    SearchParams.set(filterFeild,value);
    if(SearchParams.get('page'))
        SearchParams.set('page',1)
    setSearchParams(SearchParams);

   }
  return (
    <StyledFilter>
    {options?.map(option=>{
       return <FilterButton active= {option.value===activeFilter} disabled={option.value===activeFilter} key={option.value} onClick={()=>handleClick(option.value)} >{option.label}</FilterButton>
    })}
    </StyledFilter>
    
  )
}
