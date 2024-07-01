import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
export default function useUpdatePassword(){
    const queryClient=useQueryClient();
    const {mutate:UpdatePassword,isLoading:isUpdatePassword}=useMutation({
        mutationFn:(givenData)=>fetchApi("api/v1/auth/updatepassword","PATCH",givenData),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["user"]});
            alert("updated sucessfully")

        },
        onError:(err)=>{
             alert(err)
        }
    

    })
    return {UpdatePassword,isUpdatePassword};
}