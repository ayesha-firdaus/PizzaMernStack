import styled from 'styled-components';

const Label = styled.label`
  font-size: 2rem;
  letter-spacing: 2.75px;
  line-height: 1.2rem;
  color: ${(props) => props.color || '#1e2f23'}; /* Default color if props.color is not provided */
  font-weight: 400;
  white-space: nowrap;
`;

export default Label;