import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";


export default function useEditPizza() {
    const queryClient = useQueryClient();
    const { mutate: editPizza, isLoading: isEditing } = useMutation({
        mutationFn: ({ newData, id }) => {
            return fetchApi(`api/v1/pizza/${id}`, "PATCH", newData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pizza"] });
            
        },
        onError: (err) => {
            
        }
    });
    return { editPizza, isEditing };
}
