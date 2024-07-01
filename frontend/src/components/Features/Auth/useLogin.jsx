import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
import FeedBack from "../../ui/FeedBack";
import { useState } from "react";
export default function useLogin(){
    const queryClient=useQueryClient();
    const [Feedbacked,setFeedBack]=useState({error:false,message:''})
    
    const {mutate:Login,isLoading:isLogingIn,error}=useMutation({
        mutationFn:(givenData)=>fetchApi("api/v1/auth/login","POST",givenData),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:["auth"]});
            console.log(data)
           setFeedBack({error:false,message:data.message})

        },
        onError:(error)=>{
          
            setFeedBack({error:true,message:error.message});
        }
    

    })
    return {Login,isLogingIn,error,Feedbacked}
}