import React from 'react';
import img from "../../Data/landing.jpg";
import styled from "styled-components";
import Modal from '../ui/Modal';
import Login from '../Features/Auth/Login';
import { Link } from 'react-router-dom';
import Signup from '../Features/Auth/Signup';
import isLoggedIn from '../Features/Auth/isLoggedIn';
import Heading from '../ui/Heading';
const Container = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
max-width: 90vw;
margin: 0 auto;
padding: 4rem 4.8rem;
gap: 4.8rem;
`;

const ImageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: relative; /* Needed for positioning the pseudo-element */
`;

const Image = styled.img`
width: 100%;
border-radius: 47%;
`;

const TextContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;

`;

const Title = styled.h1`
font-size: 8.4rem;
letter-spacing: -1.75px;
text-transform: capitalize;
color: #454545;
margin-bottom: 1.2rem;
`;
const Description = styled.p`
font-size:2.4rem;
letter-spacing:1.5px;
color: #38302e;
font-size:500;
margin-bottom: 1.5rem;`;
const Button= styled.button`
border: none;
padding: 1.2rem 1.8rem;
background-color:#EC5800 ;
border-radius: 12px;
color: #F5F5DC;
text-transform: uppercase;
font-weight: 700;
&:hover{
background-color:#d44f00;
}

`
export default function Home() {
    const  {isLoading,user,isAuth}=isLoggedIn();
    console.log(user)
    return (
        <Container>
       
            <TextContainer>
                <Title>Best Pizza from oven straight to you.</Title>
                <Description>Just one click away from fresh, delicious pizza  </Description>
                <div>
                {user?<Heading type="subheading" as="h4" color="#EC5800">Continue,Ordering {user?.name}</Heading>:
                <Modal>
                <Modal.Open opens={"login"}>
                  <Button>Eat Fresh</Button>
                
                  </Modal.Open>
                  <Modal.Window name={"login"} background={"#f6f6e0"} color="#EC5800" width={"55vw"}>
                    <Login  />
                  </Modal.Window>
                  </Modal>}
               
                </div>
            </TextContainer>
            <ImageContainer>
                <Image src={img} />
            </ImageContainer>
      
        </Container>
    );
}
