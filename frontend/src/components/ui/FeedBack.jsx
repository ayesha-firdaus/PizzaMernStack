import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const P = styled.span`
  display: flex;
  justify-content: center;
  color: ${(props) => (props.error ? props.errorColor : props.successColor)};
  text-transform: uppercase;
  letter-spacing: 0.75px;
  background-color: ${(props) =>
    props.error ? props.errorbackgroundColor : props.successbackgroundColor};
  border-radius: 9px;
  padding: 1rem;
`;

export default function FeedBack({ feedback }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (feedback.error || !feedback.error) {
      setIsVisible(true);
      const duration = feedback.error ? 5000 : 3000;
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div>
      {isVisible && (
        <P error={feedback.error} errorbackgroundColor="#e4b1ab" errorColor="#b91c1c" successColor="#84cc16" successbackgroundColor="#cdeac0">
          {feedback.message}
        </P>
      )}
    </div>
  );
}
