import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";

export default function  useSignup(){
    const queryClient=useQueryClient();
    const {mutate:Signup,isLoading:isSigning}=useMutation({
        mutationFn:(givendata)=>fetchApi("api/v1/auth/signup","POST",givendata),
        onSuccess:()=>{
 
          queryClient.invalidateQueries({queryKey:["auth"]});
       
        },
        onError:(err)=>{
          
        }
      })
      return {Signup,isSigning};
}