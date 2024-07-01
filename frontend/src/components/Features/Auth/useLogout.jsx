import { useQueryClient, useMutation } from '@tanstack/react-query';
import fetchApi from '../../Hook/fetchApi';
import { persistor } from '../../../store'; // Adjust the import path according to your project structure

export default function useLogout(clearStateCallback) {
    const queryClient = useQueryClient();
    const { mutate: Logout, isLoading: isLoggingOut } = useMutation({
        mutationFn: () => fetchApi("api/v1/auth/logout", "GET"),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
            await persistor.purge(); // Clear the Redux Persist storage
            if (typeof clearStateCallback === 'function') {
                clearStateCallback(); // Invoke the clear state callback function
            }
        },
        onError: (err) => {
            console.error("Logout error:", err);
        }
    });

    return { Logout, isLoggingOut };
}

