import { useQueryClient, useMutation } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function useResetPassword() {
  const queryClient = useQueryClient();
  const navigate=useNavigate();

  const { mutate: ResetPassword, isLoading } = useMutation({
    mutationFn: ({ data, token }) => {
        console.log(data)
      // Ensure to return the promise from fetchApi
      return fetchApi(`api/v1/auth/resetpassword/${token}`, "PATCH", data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
       alert(data.message)
       navigate("/")
    },
    onError: (err) => {
      console.error("Error resetting password:", err);
      // Handle error appropriately
    },
  });

  return { ResetPassword, isLoading };
}
