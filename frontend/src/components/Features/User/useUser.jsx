import {useQuery} from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
import React from 'react'

export default function useUser() {
const {isLoading,data,error}=useQuery({
    queryKey:["user"],
    queryFn:()=>fetchApi("api/v1/user","GET")
})
let users=data?.data;

return {isLoading,users,error};
}
