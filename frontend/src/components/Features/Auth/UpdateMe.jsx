import React from 'react';
import isLoggedIn from './isLoggedIn';
import FormContainer from '../../ui/FormComponents/FormContainer';
import { useForm } from 'react-hook-form';
import Input from '../../ui/FormComponents/Input';
import img from "../../../Data/finalSignup.jpg";
import styled from 'styled-components';
import FormRow from '../../ui/FormComponents/FormRow';
import useUpdateMe from './useUpdateMe';
import FormHeading from '../../ui/FormComponents/FormHeading';
import FormButton from '../../ui/FormComponents/FormButton';
import UpdatePassword from './UpdatePassword';
import Row from "../../ui/Row."
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const Container = styled.div`
  max-width: 80vw;
  margin: 2rem auto;
  background-color: #EC7F2C;
  padding: 4rem 2rem;
  border-radius: 12px;
  box-shadow: 0 34px 10px #454545;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9rem;
`;
export default function UpdateMe() {
  const { isLoading, user, isAuth } = isLoggedIn();
  const { UpdateMe, isUpdateMe } = useUpdateMe();

  // Destructure user data, handling default values
  const { _id: isEdit, ...values } = user;
  const isEditSession = Boolean(isEdit);

  // Initialize useForm with defaultValues and configuration for file input
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: values, // Set defaultValues from user object
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const imageFile = data.photo && data.photo[0];
  
      if (imageFile && imageFile instanceof File) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imageUrl = event.target.result;
  
          const img = new Image();
          img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
  
            const maxWidth = 800;
            const maxHeight = 600;
            let width = img.width;
            let height = img.height;
  
            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }
  
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const compressedImageUrl = canvas.toDataURL('image/jpeg', 0.5);
  
            const newData = { ...data, photo: compressedImageUrl };
  
            // Call your UpdateMe function with newData
            UpdateMe(newData);
          };
  
          img.src = imageUrl;
        };
  
        reader.readAsDataURL(imageFile);
      } else {
        // If no image file, proceed with the existing data
        UpdateMe(data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
    

  return (
    <Container>
      <FormContainer img={img} ImageBorder='47%'>
      <Div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormHeading color='#6B3215'>Update Me Form</FormHeading>
          <FormRow labelColor='#FFE1BB' title="Enter the Username" error={errors?.name?.message}>
            <Input type="text" id="name" {...register("name", { required: "Username is required" })} />
          </FormRow>
          <FormRow labelColor='#FFE1BB' title="Enter the Email" error={errors?.email?.message}>
            <Input type="email" id="email" {...register("email", { required: "Email is required" })} />
          </FormRow>
          <FormRow labelColor='#FFE1BB' title="Enter the Photo" error={errors?.photo?.message}>
            <Input type="file" accept='image/*' id="photo" {...register("photo")} />
          </FormRow>
          <FormRow>
            <FormButton background={"#6B3215"} hover="#2b1408" color='#F5F5DC'>
              Submit
            </FormButton>
          </FormRow>
        </Form>
       <UpdatePassword />
       </Div>
      </FormContainer>
    </Container>
  );
}
