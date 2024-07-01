import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getToday } from '../utils/Helper';
import { subDays } from 'date-fns';
import fetchApi from '../Hook/fetchApi';

export default function useRecentOrders() {
  const todayDate = getToday({ end: true });
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data, error } = useQuery({
    queryKey: ['Order', numDays],
    queryFn: () =>
      fetchApi(
        `api/v1/order?feilds=created_at,totalPrice&created_at[gte]=${queryDate}&created_at[lte]=${todayDate}`,"GET"
      ),
  });


  return { isLoading,data, error,numDays };
}
