import {useQuery} from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
import React from 'react'

export default function isLoggedIn() {
const {isLoading,data}=useQuery({
    queryKey:["auth"],
    queryFn:()=>fetchApi("api/v1/auth/isLogged","GET")
})
let user=data?.user

return {isLoading,isAuth:user?true:false,user};
}
