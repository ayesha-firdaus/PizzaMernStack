import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import styled from 'styled-components';
import { getTotalQuantity } from '../Features/Cart/CartSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import isLoggedIn from '../Features/Auth/isLoggedIn';
import Button from '../ui/Button';
import useLogout from '../Features/Auth/useLogout';
import Web3 from 'web3';
import abi from '../../../../truffle/build/contracts/Pizza.json';
import { useWeb3 } from '../Service/Web3Context';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 3rem;
`;

const Span = styled.span`
  color: #ec5800;
  letter-spacing: 3.75px;
  font-size: 3.2rem;
  padding: 1.2rem 1.6rem;
`;

const UI = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
`;

const Li = styled.li`
  font-size: 1.5rem;
  letter-spacing: 1.75px;
  color: #1e2f23;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: #ec5800;
  }
`;

const Div = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 4.2rem;
  border-radius: 50%;
`;

export default function Navbar() {
  const totalquantity = useSelector(getTotalQuantity);
  const { isLoading, user, isAuth } = isLoggedIn();
  const { Logout, isLoggingout } = useLogout();
  const { web3Data, setWeb3Data } = useWeb3();
  const [account, setAccount] = useState(null);

  
    async function init() {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = abi.networks[networkId];
          const contractAddress = deployedNetwork && deployedNetwork.address;
          const contract = new web3.eth.Contract(abi.abi, contractAddress);
          console.log(accounts,web3,contract)
          setAccount(accounts[0]);
          setWeb3Data({ web3, contract, accounts });
         
        } catch (error) {
          console.error('Error connecting to MetaMask', error);
        }
      } else {
        alert('MetaMask is not installed. Please install MetaMask and try again.');
      }
    }


    console.log(web3Data)

  return (
    <Container>
      <Nav>
        <Link to="/"><Span>-Pizza.Co-</Span></Link>
        <UI>
          <Li>Testimonial</Li>
          <Link to="/menu"><Li>Menu</Li></Link>
          <Link to="/cart"><Li>Cart({totalquantity})</Li></Link>
          <Link to="/order"><Li>Order</Li></Link>
          {user?.role==="admin"&&<Link to="/dashboard"><Li>Dashboard</Li></Link>}
          
          {user ? (
            <Div>
              <Link to="/updateme">
                <Img src={`../../../public/users/${user.photo}`} />
              </Link>
              <Button
                disabled={isLoggingout}
                size="small"
                backgroundColor="#ff6b6b"
                color="#f7f7e3"
                backgroundHover="#e66060"
                onClick={() => Logout()}
              >
                Logout
              </Button>
            </Div>
          ) : (
            <Link to="/signup"><Li>Signup</Li></Link>
          )}
          <Button
            backgroundColor="#FF7F50"
            color="#f7f7e3"
            backgroundHover="#EC5800"
            size="small"
            onClick={  ()=>init()}
          >
            {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect'}
          </Button>
        </UI>
      </Nav>
    </Container>
  );
}
