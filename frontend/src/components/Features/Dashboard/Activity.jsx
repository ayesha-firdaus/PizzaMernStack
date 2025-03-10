import React from 'react'
import useOrder from '../Order/useOrders'
import useRecentOrders from '../../pages/useRecentOrders';
import useTodayActivity from "./useTodayActivity"
import Row from "../../ui/Row."
import styled from 'styled-components';
import Heading from '../../ui/Heading';
import TodayItem from "./TodayItem";
import Spinner from '../../ui/Spinner';

const StyledToday = styled.div`
  /* Box */
  background-color: #f7f7e3;
  border: 1px solid #ddddc6;
  border-radius: 9px;

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

export default function Activity() {
    const {isLoading,data,error}=useTodayActivity();
    const activities=data?.data?.data
  return (
    <StyledToday>
     <Row type="horizontal">
        <Heading as="h2" type="subheading" color="#d44f00">Today</Heading>
      </Row>

    {activities?.map(el=> <TodayItem a={el} />)}
    </StyledToday>
  )
}
