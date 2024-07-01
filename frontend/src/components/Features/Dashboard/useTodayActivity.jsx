import { useQuery } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
import React from 'react';

export default function useTodayActivity() {
    const newDate = new Date();
    const formattedDate = newDate.toISOString().split('T')[0]; // format date to YYYY-MM-DD
    console.log(formattedDate);

    const {data,isLoading,error} = useQuery({
        queryKey: ["Order", formattedDate], // Add formattedDate to the query key
        queryFn: () => fetchApi(`api/v1/order?orderDate=${formattedDate}`, "GET"), // Corrected query function
        // Additional options can be provided here if needed
        // e.g., staleTime, cacheTime, retry, etc.
    });
    
    return { isLoading, data, error};
}
