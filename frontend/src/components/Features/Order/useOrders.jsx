import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchApi from "../../Hook/fetchApi";
import { useSearchParams } from "react-router-dom";
import React from 'react';

export default function useOrder() {
  const [searchParams] = useSearchParams(); // Correct destructuring
  const queryClient = useQueryClient();
  
  const filterValue = searchParams.get("status") || "all";
  console.log(filterValue)
  const page = searchParams.get('page') && Number(searchParams.get('page'));
  const limit = searchParams.get('limit') && Number(searchParams.get('limit'));
  const sortFieldParam = searchParams.get('sort');
  let sortField = '';
  let sortOrder = 'asc'; // Default sortOrder if not provided

  if (sortFieldParam) {
    [sortField, sortOrder] = sortFieldParam.split('-');
  }

  const queryKey = ['Order', filterValue, sortField, sortOrder, page, limit];
  const queryFn = async () => {
    let apiUrl = 'api/v1/order';
    
    const queryParams = new URLSearchParams();
    if (filterValue !== 'all') {
        queryParams.append('status', filterValue);
    }
    if (sortField) {
        queryParams.append('sort', `${sortOrder === 'asc' ? '' : '-'}${sortField}`);
    }
    if (page || limit) {
        queryParams.append('page', page);
        queryParams.append('limit', limit);
    }

    if (queryParams.toString()) {
        apiUrl += `?${queryParams.toString()}`;
    }

    return fetchApi(apiUrl, 'GET');
  };

  const { isLoading, data, error } = useQuery({
    queryKey,
    queryFn
  });

  let totalCount
  if(data?.totalCount)
      {
           totalCount =data?.totalCount || 0;
      }
     const PageCount=totalCount/limit;
     if(page<PageCount){
      queryClient.prefetchQuery({
          queryKey:['booking', filterValue, sortField, sortOrder, page+1, limit],
          queryFn,
      })
  }
  if(page>1){
      queryClient.prefetchQuery({
          queryKey:['booking', filterValue, sortField, sortOrder, page-1, limit],
          queryFn,
      })
  }
  return { isLoading, data,totalCount, error };
}
