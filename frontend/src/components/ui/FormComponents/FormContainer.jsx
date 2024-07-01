import React from 'react'
import styled from 'styled-components'
const ImageContainer=styled.img`
width:100%;
height:100%;
padding: 0;
border-radius: ${(props)=>props.borderRadius||'12px'};
`
const ContainerForm=styled.div`
display: grid;
grid-template-columns:60fr 40fr;
gap: 2rem;
`
export default function FormContainer({children,img,ImageBorder=""}) {
  return (
    <ContainerForm>
    <div>
    <ImageContainer borderRadius={ImageBorder} src={img}  width={'100%'}/>
    </div>
    {children}
    </ContainerForm>
  )
}
