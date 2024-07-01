import React from 'react';
import styled from 'styled-components';
import FormHeading from '../../ui/FormComponents/FormHeading';
import FormRow1 from '../../ui/FormComponents/FormRow1';
import FormButton from '../../ui/FormComponents/FormButton';
import { useForm } from 'react-hook-form';
import Input from '../../ui/FormComponents/Input';
import useResetPassword from './useResetPassword';
import { useParams, useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 50vw;
  margin: 0 auto;
`;

const Forms = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export default function ResetPassword() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { ResetPassword, isLoading } = useResetPassword();
  const navigate = useNavigate();

  const { token } = useParams();
  console.log(token);

  const { errors } = formState;

  const onSubmit = (data) => {
    try {
    console.log(data)
  ResetPassword({ data, token });
      reset();
      // Update the current URL without navigating
    } catch (error) {
      console.error('Error resetting password:', error);
      // Handle error state or show error message
    }
  };

  return (
    <Container>
      <Forms onSubmit={handleSubmit(onSubmit)}>
        <FormHeading color='#d44f00'>Reset Password Form</FormHeading>
        <FormRow1 labelColor='#ff6b6b' title='Password' error={errors?.password?.message}>
          <Input type="text" id="password" {...register("password", {
            required: "Password is required"
          })} />
        </FormRow1>
        <FormRow1 labelColor='#ff6b6b' title='Password Confirm' error={errors?.passwordConfirm?.message}>
          <Input type="text" id="passwordConfirm" {...register("passwordConfirm", {
            required: "Password Confirm is required"
          })} />
        </FormRow1>
        <FormRow1 type="horizontal">
          <FormButton background="#FF7F50" color="#F5F5DC" hover="#EC5800" disabled={isLoading}>Submit</FormButton>
        </FormRow1>
      </Forms>
    </Container>
  );
}

