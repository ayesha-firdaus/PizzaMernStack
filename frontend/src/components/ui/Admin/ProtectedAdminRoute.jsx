import React, { useEffect } from 'react'
import isLoggedIn from '../../Features/Auth/isLoggedIn'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedAdminRoutes({children}) {
    const  {isLoading,user}=isLoggedIn();
    const isAuth=user?.role==="admin"
    const navigate=useNavigate();
    useEffect(()=>{
        if(!isLoading&&!isAuth){
            navigate("/")
        }
    },[isAuth,isLoading,navigate])
    if (isLoading) {
        return (
          <FullPage>
            <Spinner />
          </FullPage>
        );
      }
    if (isAuth) {
        return children;
      }
      return null; 
 
}
