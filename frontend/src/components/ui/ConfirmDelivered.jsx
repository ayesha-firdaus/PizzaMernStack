import React from 'react';
import Heading from './Heading';
import Button from './Button';
import useEditStatus from "../Features/Dashboard/useEditStatus";
import styled from 'styled-components';

const StyledConfirmDelivered = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: #e66060;
    margin-bottom: 1.2rem;
    font-size: 1.6rem;
    letter-spacing: 1.75px;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export default function ConfirmDelivered({ resource = "", onClose, id }) {
  const { editStatus, isEditing } = useEditStatus();

  const handleConfirmClick = () => {
    editStatus(id, {
      onSuccess: () => {
        onClose?.();
      },
    });
  };

  return (
    <StyledConfirmDelivered>
      <Heading type="h2" as="h2" color="#d44f00">Confirm Status</Heading>
      <p>Are you sure you want to change Status to delivered?</p>
      <div>
        <Button
          size={"small"}
          backgroundColor="#FF7F50"
          color="#F5F5DC"
          backgroundHover="#EC5800"
          onClick={() => onClose?.()}
        >
          Cancel
        </Button>
        <Button
          size={"small"}
          backgroundColor="#ff6b6b"
          color="#F5F5DC"
          backgroundHover="#e66060"
          onClick={handleConfirmClick}
          disabled={isEditing}
        >
          Confirm
        </Button>
      </div>
    </StyledConfirmDelivered>
  );
}

