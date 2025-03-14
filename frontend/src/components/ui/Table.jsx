import { createContext,useContext } from "react";
import styled from "styled-components";
const StyledTable=styled.div`
border:1px solid #ddddc6;
font-size:1.4rem;
background-color:#f7f7e3;
border-radius:7px;
overflow:hidden;
`;
const CommonRow=styled.header`
display: grid;
grid-template-columns:${(props)=>props.columns};
column-gap:2.4rem;
align-items:center;
transition:none;`;

const StyledHeader=styled(CommonRow)`
padding:1.6rem 2.4rem;
background-color:#f6f6e0;
border-bottom:1px solid #ddddc6;
text-transform: uppercase;
letter-spacing: 0.4px;
font-weight: 600;
color:#d44f00;
`
const StyledBody = styled.section`
  margin: 0.4rem 0;
`;
const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  margin-bottom: 1.5rem;

  &:not(:last-child) {
    border-bottom: 1px solid #ddddc6;
  }
`;
const Footer = styled.footer`
  background-color:#F5F5DC;
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext=createContext();
export default function Table({columns,children})
{
    return(
        <TableContext.Provider value={{columns}}>
            <StyledTable role="table">
                {children}
            </StyledTable>
        </TableContext.Provider>
    )
}
function Header({children}){
    const {columns}=useContext(TableContext);
    return <StyledHeader role="row" columns={columns}>
        {children}
    </StyledHeader>
}
function Row({children}){
    const {columns}=useContext(TableContext)
    return <StyledRow columns={columns} role="row">{children}</StyledRow>
}
function Body({data,render})
{
    if(data?.length===0)
        {
            return <Empty>No Content here</Empty>
        }
return <StyledBody>{data?.map(render)}</StyledBody>
}

Table.Header=Header;
Table.Row=Row;
Table.Body=Body;
Table.Footer=Footer;