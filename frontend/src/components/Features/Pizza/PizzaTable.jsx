import React from 'react'
import Table from '../../ui/Table'
import usePizza from './usePizza'
import Spinner from '../../ui/Spinner';
import PizzaRow from './PizzaRow';
import { useSearchParams } from 'react-router-dom';

export default function table() {
    let {isLoading,pizzas,error}=usePizza();
    pizzas=pizzas?.data;
    if(isLoading)
        {
            <Spinner />
        }
   const [SearchParams]=useSearchParams();
   let filteredValue=[];
   const filterValue=SearchParams.get("Soldout")||"all";
   const Sortby=SearchParams.get("sort")||'name-asc';
  
   const [sortValue,sortOrder]=Sortby.split('-');
   console.log(Sortby,sortValue,sortOrder)
   if(filterValue==="Soldout")
    {
        filteredValue=pizzas?.filter(el=>el.SoldOut===true)
    }
    else if(filterValue==="not-Soldout")
        {
            filteredValue=pizzas?.filter(el=>el.SoldOut===false)
        }
        else if(filterValue==="all")
            {
                filteredValue=pizzas;
            }
   filteredValue?.sort((a,b)=>{
    if(sortOrder==="asc")
            {
                
              return  a[sortValue]-b[sortValue];
            }
            else{
             return   b[sortValue]-a[sortValue];
            }
    })

  return (

   <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
   <Table.Header>
    <div></div>
    <div>Name</div>
    <div>Ingredients</div>
    <div>Price</div>
    <div>Sold Out</div>
    <div></div>
</Table.Header>
<Table.Body data={filteredValue} render={pizza=><PizzaRow pizza={pizza} key={pizza._id} />} />
   </Table>
  )
}
