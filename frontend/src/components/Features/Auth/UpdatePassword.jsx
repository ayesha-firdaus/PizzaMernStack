import React from 'react'
import FormHeading from '../../ui/FormComponents/FormHeading';
import FormButton from '../../ui/FormComponents/FormButton';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormComponents/FormRow';
import Input from '../../ui/FormComponents/Input';
import styled from 'styled-components';
import useUpdatePassword from './useUpdatePassword';
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
export default function UpdatePassword() {
    const { register, handleSubmit, reset, getValues, formState, setValue } = useForm();
    const { errors } = formState;
   const {UpdatePassword,isUpdatePassword}=useUpdatePassword();
    function Submit(data)
    {
    
     UpdatePassword(data);
     reset();
    }
  return (
    <Form onSubmit={handleSubmit(Submit)}>
  
    <FormRow labelColor='#FFE1BB' title="Enter the Current Password" error={errors?.currentpassword?.message}>
    <Input type="password" id="currentpassword" {...register("currentpassword", {
      required: "Password is required"
    })} />
    </FormRow>
    <FormRow labelColor='#FFE1BB' title="Enter the Password" error={errors?.password?.message}>
    <Input type="password" id="password" {...register("password", {
      required: "Password is required"
    })} />
  </FormRow>
  <FormRow labelColor='#FFE1BB' title="Enter the Password Confirm" error={errors?.passwordConfirm?.message}>
    <Input type="password" id="passwordConfirm" {...register("passwordConfirm", {
      required: "Password confirmation is required"
    })} />
  </FormRow>
    <FormRow>
            <FormButton background={"#6B3215"} disabled={isUpdatePassword} hover="#2b1408" color='#F5F5DC'>
              Submit
            </FormButton>
          </FormRow>
  </Form>

  )
}
