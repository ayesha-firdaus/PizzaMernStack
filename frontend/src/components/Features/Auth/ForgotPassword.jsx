import React from 'react'
import styled from 'styled-components';
import FormHeading from '../../ui/FormComponents/FormHeading';
import FormRow1 from '../../ui/FormComponents/FormRow1';
import FormButton from '../../ui/FormComponents/FormButton';
import { useForm } from 'react-hook-form';
import Input from '../../ui/FormComponents/Input';
import useForgotPassword from './useForgotPassword';


const Container=styled.div`
width:50vw;
margin:0 auto;
`
const Forms =styled.form`
display: flex;
flex-direction:column;
gap:3rem
`
export default function ForgotPassword() {
    const {register,handleSubmit,reset,getValues,formState}=useForm();
    const {ForgotPassword,isLoading}=useForgotPassword();

const {errors}=formState;
function onSubmit(data)
{
 ForgotPassword(data);
  reset()
}
  return (
    <Container>
    <Forms onSubmit={handleSubmit(onSubmit)}>
    <FormHeading color='#d44f00'>Forgot Password Form</FormHeading>
    <FormRow1 labelColor='#ff6b6b' title='Email' error={errors?.email?.message}>
       
    <Input type="text" id ="email" {...register("email",{
      required:"Email is required"
    })}/>
    </FormRow1>
      <FormRow1 type="horizontal">
    <FormButton background="#FF7F50" color="#F5F5DC" hover="#EC5800 " disabled={isLoading} >Submit</FormButton>
     
</FormRow1>
    </Forms>
    </Container>
  )
}
