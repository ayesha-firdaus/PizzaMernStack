import { useQueryClient,useMutation } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
import React from 'react'

export default function useForgotPassword() {
    const queryClient=useQueryClient();
    const {mutate:ForgotPassword,isLoading}=useMutation({
        mutationFn:(givenData)=>fetchApi("api/v1/auth/forgotpassword","POST",givenData),
    
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["auth"]});
        alert("MAIL IS SENT")

    },
    onError:(err)=>{
    console.log(err);
    }
})
  return {ForgotPassword,isLoading};
}

