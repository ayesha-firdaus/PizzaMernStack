import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const Button=styled.button`
background-color: ${(props)=>props.backgroundColor};
color:${(props)=>props.color} ;
border-radius: 9px;
border:none;
&:hover{
    background-color:${(props)=>props.backgroundHover} ;
}

${(props) => sizes[props.size]}
`
export default Button;