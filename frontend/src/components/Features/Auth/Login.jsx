import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Input from '../../ui/FormComponents/Input';
import FormRow1 from '../../ui/FormComponents/FormRow1';
import FormHeading from '../../ui/FormComponents/FormHeading';
import FormButton from '../../ui/FormComponents/FormButton';
import FormContainer from '../../ui/FormComponents/FormContainer';
import Row from '../../ui/Row.';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from './useLogin';
import FeedBack from '../../ui/FeedBack';

const Forms = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const P = styled.p`
    display: flex;
    justify-content: end;
    color: #d44f00;
    text-transform: uppercase;
    letter-spacing: 0.75px;
`;

export default function Form() {
    const navigate = useNavigate();
    const { Login, isLoggingIn, error, Feedbacked } = useLogin();
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;
console.log(Feedbacked)
    const onSubmit = (data) => {
        Login(data);
        reset();
    };

    return (
        <Forms onSubmit={handleSubmit(onSubmit)}>
            <FormHeading color='#d44f00'>Login Form</FormHeading>
            <FormRow1 labelColor='#ff6b6b' title='Email' error={errors?.email?.message}>
                <Input type="text" id="email" {...register("email", { required: "Email is required" })} />
            </FormRow1>
            <FormRow1 labelColor='#ff6b6b' title="Password" error={errors?.password?.message}>
                <Row type="vertical">
                    <Input type="password" id="password" {...register("password", { required: "Password is required" })} />
                    <Link to="/forgotpassword"><P>Forgot Password</P></Link>
                </Row>
            </FormRow1>
            <FormRow1 type="horizontal">
                <FormButton background="#FF7F50" color="#F5F5DC" hover="#EC5800" disabled={isLoggingIn}>Submit</FormButton>
                <Link to="/signup">Signup</Link>
               
            </FormRow1>
            {Feedbacked && <FeedBack feedback={Feedbacked} />}
        </Forms>
    );
}
