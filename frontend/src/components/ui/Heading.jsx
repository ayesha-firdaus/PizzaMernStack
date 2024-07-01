import styled ,{css} from "styled-components";
const Heading =styled.h1`
${(props)=>props.type==="h1"&&css`
font-size:4.8rem;
letter-spacing:-1.75px;
line-height:1.2;
color:${props=>props.color}`
}
${(props)=>props.type==="h2"&&css`
    font-size:3.2rem;
letter-spacing:0.75px;
line-height:1.2;
color:${props=>props.color}`}
${(props)=>props.type==="h3"&&css`
    font-size:2rem;
letter-spacing:0.75px;
line-height:1.2;
color:${props=>props.color}`}
${(props)=>props.type==="subheading"&&css`
    font-size:1.5rem;
letter-spacing:1.75px;
line-height:1.2;
text-transform: capitalize;
color:${props=>props.color}
`
}

`
export default Heading;