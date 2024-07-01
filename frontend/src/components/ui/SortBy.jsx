import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Select from './Select';
export default function SortBy({options}) {
const [SearchParams,setSearchParams]=useSearchParams();
   function handleClick(value){
    const newSearchParam=new URLSearchParams(SearchParams);
    newSearchParam.set("sort",value);
    setSearchParams(newSearchParam);
   }
  return (
<Select options={options} onChange={(e)=>handleClick(e.target.value)} />
    
  )
}
