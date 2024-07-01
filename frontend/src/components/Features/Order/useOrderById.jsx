import {useQuery} from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
import React from 'react'
import isLoggedIn from "../Auth/isLoggedIn";

export default function useOrderById() {
const  {user}=isLoggedIn();
const {isLoading,data,error}=useQuery({
    queryKey:["Order"],
    queryFn:(id)=>fetchApi(`api/v1/order?userId=${user._id}`,"GET")
})


return {isLoading,data,error};
}
