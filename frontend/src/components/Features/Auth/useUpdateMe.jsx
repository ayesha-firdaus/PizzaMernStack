import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
export default function useUpdateMe(){
    const queryClient=useQueryClient();
    const {mutate:UpdateMe,isLoading:isUpdateMe}=useMutation({
        mutationFn:(givenData)=>fetchApi("api/v1/user/updateMe","PATCH",givenData),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["user"]});
            alert("updated sucessfully")

        },
        onError:(err)=>{
              console.log(err)
        }
    

    })
    return {UpdateMe,isUpdateMe};
}