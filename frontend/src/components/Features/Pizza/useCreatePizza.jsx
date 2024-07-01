import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";

export function useCreatePizza(){
    const queryClient=useQueryClient();
    const {mutate:createPizza,isLoading:isCreating}=useMutation({
        mutationFn:(givendata)=>fetchApi("api/v1/pizza","POST",givendata),
        onSuccess:()=>{
 
          queryClient.invalidateQueries({queryKey:["pizza"]});
       
        },
        onError:(err)=>{
          
        }
      })
      return {createPizza,isCreating};
}