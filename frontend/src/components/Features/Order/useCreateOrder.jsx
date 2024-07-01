import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
import { useDispatch } from "react-redux";
import { clearCart } from "../Cart/CartSlice";
export function useCreateOrder(){
    const dispatch=useDispatch();
    const queryClient=useQueryClient();
    const {mutate:createOrder,isLoading:isCreating}=useMutation({
        mutationFn:(givendata)=>fetchApi("api/v1/order","POST",givendata),
        onSuccess:()=>{
          alert("Order Confirmed")
          queryClient.invalidateQueries({queryKey:["Order"]});
          dispatch(clearCart())
        },
        onError:(err)=>{
          
        }
      })
      return {createOrder,isCreating};
}