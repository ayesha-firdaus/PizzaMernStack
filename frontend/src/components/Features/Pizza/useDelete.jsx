import { useMutation,useQueryClient } from "@tanstack/react-query";
import React from 'react'
import fetchApi from "../../Hook/fetchApi";

export default function useDelete() {
    const queryClient=useQueryClient();
    const {mutate:deletePizza,isLoading:isDeleting}=useMutation({
        mutationFn:(id)=>fetchApi(`api/v1/pizza/${id}`,"DELETE"),
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ["pizza"] });
            
        },
        onError:(err)=>{

        }
    })
  return {deletePizza,isDeleting};
}
