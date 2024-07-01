import styled from "styled-components";

const FormButton = styled.button`
  border: none;
  padding: 1.2rem 1.8rem;
  background-color: ${(props) => props.background};
  border-radius: 12px;
  color: ${(props) => props.color};
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hover};
  }

  &:disabled {
    background-color: #FFFFFF; /* A light grey color for the disabled state */
    color: #800020; /* A darker grey for the text to indicate disabled state */
    cursor: not-allowed; /* Changes the cursor to indicate the button is not clickable */
  }
`;

export default FormButton;
