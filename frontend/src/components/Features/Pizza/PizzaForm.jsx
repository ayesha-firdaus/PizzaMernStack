import React from 'react';
import styled from 'styled-components';
import FormRow1 from '../../ui/FormComponents/FormRow1';
import Input from '../../ui/FormComponents/Input';
import FormButton from '../../ui/FormComponents/FormButton';
import { useForm } from 'react-hook-form';
import { useCreatePizza } from './useCreatePizza';
import useEditPizza from './useEditPizza';

const Forms = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 80vw;
  margin: 0 auto;
  gap: 3rem;
`;

export default function PizzaForm({ onClose, PizzatoEdit = {} }) {
  const { _id: editId, ...editValues } = PizzatoEdit;
  const isEditSession = Boolean(editId);
  console.log(isEditSession)
  const { register, handleSubmit, reset, formState } = useForm({ defaultValues: isEditSession ? editValues : {} });

  const { createPizza, isCreating } = useCreatePizza();
  const { editPizza, isEditing } = useEditPizza();
  const { errors } = formState;
  const isWorking = isEditSession ? isEditing : isCreating;

  const onSubmit = (data) => {
    const imageFile = data.image && data.image[0];

    if (imageFile && imageFile instanceof Blob) {
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

          const newData = { ...data, photoUrl: compressedImageUrl };

          if (isEditSession) {
            editPizza({ newData, id: editId }, { onSuccess: () => { onClose?.(); reset(); } });
          } else {
            createPizza(newData, { onSuccess: () => { onClose?.(); reset(); } });
          }
        };

        img.src = imageUrl;
      };

      reader.readAsDataURL(imageFile);
    } else {
      const newData = data;

      if (isEditSession) {
        editPizza({ newData, id: editId }, { onSuccess: () => { onClose?.(); reset(); } });
      } else {
        createPizza(data, { onSuccess: () => { onClose?.(); reset(); } });
      }
    }
  };

  return (
    <Forms onSubmit={handleSubmit(onSubmit)}>
      <FormRow1 labelColor='#d44f00' title="Name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register("name", {
          required: "Name is required"
        })} />
      </FormRow1>

      <FormRow1 labelColor='#d44f00' title="Ingredients" error={errors?.ingredients?.message}>
        <Input type="text" id="ingredients" disabled={isWorking} {...register("ingredients", {
          required: "Ingredients are required"
        })} />
      </FormRow1>

      <FormRow1 labelColor='#d44f00' title="Price" error={errors?.price?.message}>
        <Input type="number" id="price" disabled={isWorking} {...register("price", {
          required: "Price is required"
        })} />
      </FormRow1>

      <FormRow1 labelColor='#d44f00' title="Quantity" error={errors?.quantity?.message}>
        <Input type="number" id="quantity" disabled={isWorking} {...register("quantity", {
          required: "Quantity is required"
        })} />
      </FormRow1>

      <FormRow1 labelColor='#d44f00' title="Image" error={errors?.image?.message}>
        <Input type="file" id="image" accept='image/*' {...register("image")} />
      </FormRow1>

      <FormRow1>
        <FormButton background="#FF7F50" color="#F5F5DC" hover="#EC5800" disabled={isWorking}>Submit</FormButton>
      </FormRow1>
    </Forms>
  );
}
