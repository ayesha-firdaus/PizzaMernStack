import React,{createContext,cloneElement, useContext,useState,useRef } from "react"
import {createPortal} from "react-dom";
import OutsideClick from '../Hook/OutsideClick';
import styled from "styled-components";
import { HiXMark } from 'react-icons/hi2';
const StyledModal=styled.div`
position:fixed;
top:50%;
left:50%;
width: ${(props)=>props.width};
transform:translate(-50%,-50%);
box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
background-color:${(props)=>props.background};
color:${(props)=>props.color}; 
border-radius: 12px;
padding: 3.2rem 4rem;
transition: all 0.5s;
`
const StyledOverlay=styled.div`
position: fixed;
top:0%;
left:0;
width:100%;
height:100vh;
background-color:rgba(255, 255, 255, 0.1);
backdrop-filter:blur(4px);
z-index:1000;
transistion:all 0.5s;
`
const Button=styled.button`
border:none;
background-color:none;
padding: 0.4rem;
border-radius: 5px;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

`
const ModalContext=createContext();



 function Modal({children}) {
    const [open,setopen]=useState('');
    const close=()=>setopen('');
  return (

    <ModalContext.Provider value={{open,setopen,close}}>{children}</ModalContext.Provider>
  )
}
function Open({opens,children})
{
    const {setopen}=useContext(ModalContext);
    return cloneElement(children,{onClick:
      ()=>{ console.log('CLICK')
        setopen(opens)}})
}
function Window({name,children,background,color,width}){
    const {open,close}=useContext(ModalContext);
    const ref=useRef()
    OutsideClick(ref,close);
    if(name!==open)
        {
            return;
        }
    return createPortal(
    <StyledOverlay ref={ref} >
    <StyledModal background={background} color={color} width={width}>
        <Button onClick={close}><HiXMark/></Button>
       <div> {cloneElement(children,{onClose:close})}</div>
    </StyledModal></StyledOverlay>,document.body) 
}
Modal.Open=Open;
Modal.Window=Window;
export default Modal