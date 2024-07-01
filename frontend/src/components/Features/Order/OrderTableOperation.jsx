import React, { useState } from 'react'
import TableOperation from '../../ui/TableOperation'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
import { useSearchParams } from 'react-router-dom'
import Button from '../../ui/Button'
export default function OrderTableOperation() {
    const [limit,setLimit]=useState();
    const [searchParams,setSearchParams]=useSearchParams();
    function handleLimitChange(e) {
      const newLimit = e.target.value;
      setLimit(newLimit);
    }
    function setLimitInSearchParams() {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('limit', limit);
      newSearchParams.set('page', 1); // Reset to the first page when limit changes
      setSearchParams(newSearchParams);
    }
  return (
    <TableOperation>
    <Filter filterFeild="status" options={[{value:"all",label:"All"},{value:"confirmed",label:"Confirmed"},{value:"delivered",label:"Delivered"}]} />
    <SortBy options={[{value:"orderDate-asc",label:"Sort by Order date(A-Z)"},{value:"orderDate-desc",label:"Sort by Order Date(Z-A)"},{value:"totalPrice-asc",
    label:"Sort by price{low-first})"},{value:"totalPrice-desc",label:"Sort by price{high-first})"},]} />
      <div>
      <p>
        Limit <input type="number" value={limit} onChange={handleLimitChange} />
      
        <Button
         backgroundColor="#FF7F50"
            color="#f7f7e3"
            backgroundHover="#EC5800"
            size="small" onClick={setLimitInSearchParams}>Set</Button>
      </p>
    </div>
   </TableOperation>
  )
}
