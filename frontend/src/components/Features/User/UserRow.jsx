import React from 'react';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import styled, { css } from 'styled-components';
import Heading from '../../ui/Heading';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { HiTrash, HiPencil } from "react-icons/hi2";
import img from "../../../../../backend/public/img/users/user-1.jpg"
import useDelete from './useDelete';
const Img = styled.img`
  display: block;
  width: 5.2rem;
  height: auto;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
  padding: 0.2rem;

  ${(props) =>
    props.soldOut &&
    css`
      opacity: 0.8;
      filter: grayscale();
    `}
`;

const Email = styled.div`
  font-size: 1.2rem;
  font-style: italic;
  color: #414833;
  letter-spacing: 1.74px;
`;

const Role = styled.div`
  font-family: 'Sono';
  font-weight: 600;
  color: #FF7F50;
`;

const Button = styled.button`
  background-color: #FF7F50;
  color: #F5F5DC;
  border: none;
  border-radius: 47%;
  padding: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  
  &:hover {
    background-color: #EC5800;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const Rows = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function UserRow({ user = {} }) {
  const { name, email, role, photo, active, _id } = user;

  const url = `../../../../public/users/${photo}`;
const {deleteUser,isDeleting}=useDelete();

  return (
    <Table.Row>
      <Img src={url} alt={`${name}'s photo`} />
      <Heading type="subheading" as="p" color='#6B3215'>{name}</Heading>
      <Email>{email}</Email>
      <Role>{role}</Role>
      <div>{active ? "True" : "False"}</div>
      <Rows>
        <Modal>
          <Modal.Open opens="edit">
            <Button><HiPencil /></Button>
          </Modal.Open>
          <Modal.Window background="#f6f6e0" color="#EC5800" width="60vw" name="edit">
            {/* Your edit form goes here */}
          </Modal.Window>

          <Modal.Open opens="delete">
            <Button><HiTrash /></Button>
          </Modal.Open>
          <Modal.Window background={"#f6f6e0"} name="delete" color="#EC5800">
            <ConfirmDelete isLoading={isDeleting} resource='User' fn={deleteUser} id={_id} />
          </Modal.Window>
        </Modal>
      </Rows>
    </Table.Row>
  );
}
