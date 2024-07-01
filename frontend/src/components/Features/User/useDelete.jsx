import { useMutation,useQueryClient } from "@tanstack/react-query";
import React from 'react'
import fetchApi from "../../Hook/fetchApi";

export default function useDelete() {
    const queryClient=useQueryClient();
    const {mutate:deleteUser,isLoading:isDeleting}=useMutation({
        mutationFn:(id)=>fetchApi(`api/v1/user/${id}`,"DELETE"),
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ["user"] });
            
            
        },
        onError:(err)=>{

        }
    })
  return {deleteUser,isDeleting};
}