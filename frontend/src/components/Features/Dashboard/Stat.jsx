import styled from "styled-components";

const StyledStat = styled.div`
  /* Box */
  background-color: #f7f7e3;
  border: 1px solid #ddddc6;
  border-radius: 9px;

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color:${(props) => props.backgroundcolor};

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: ${(props => props.color)};
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color:#d44f00;
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;

  color: #3f4238;
`;

function Stat({ icon, title, value, color,backgroundcolor }) {

  return (
    <StyledStat>
      <Icon color={color} backgroundcolor={backgroundcolor}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat