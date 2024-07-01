import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";


export default function useEditStatus() {
    const queryClient = useQueryClient();
    const { mutate: editStatus, isLoading: isEditing } = useMutation({
        mutationFn: ( id ) => {
            return fetchApi(`api/v1/order/status/${id}`, "PATCH");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Order"] });
            
        },
        onError: (err) => {
            
        }
    });
    return { editStatus, isEditing };
}
