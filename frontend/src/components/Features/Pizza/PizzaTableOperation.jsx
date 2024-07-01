import React from 'react'
import TableOperation from '../../ui/TableOperation'
import Filter from '../../ui/Filter'
import SortBy from "../../ui/SortBy"
export default function PizzaTableOperation() {
  return (
   <TableOperation>
    <Filter filterFeild="Soldout" options={[{value:"all",label:"All"},{value:"Soldout",label:"Soldout"},{value:"not-Soldout",label:"Not Soldout"}]} />
    <SortBy options={[{value:"name-asc",label:"Sort by name(A-Z)"},{value:"name-desc",label:"Sort by name(Z-A)"},{value:"price-asc",
    label:"Sort by price{low-first})"},{value:"price-desc",label:"Sort by price{high-first})"},]} />
   </TableOperation>
  )
}
