import {useQuery} from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
import React from 'react'

export default function usePizza() {
const {isLoading,data,error}=useQuery({
    queryKey:["pizza"],
    queryFn:()=>fetchApi("api/v1/pizza","GET")
})
let pizzas=data?.data;

return {isLoading,pizzas,error};
}
