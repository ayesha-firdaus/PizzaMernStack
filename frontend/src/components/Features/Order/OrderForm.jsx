import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import FormRow1 from '../../ui/FormComponents/FormRow1';
import Input from '../../ui/FormComponents/Input';
import Button from '../../ui/Button';
import { fetchAddress } from '../../Service/fetchAddress';
import { useSelector } from 'react-redux';
import FormButton from '../../ui/FormComponents/FormButton';
import { getTotalPrice,getCart } from '../Cart/CartSlice';
import Heading from '../../ui/Heading';
import { useWeb3 } from '../../Service/Web3Context';
import { useCreateOrder } from './useCreateOrder';


const Forms = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  margin: 0 auto;
  gap: 3rem;
`;

const Div = styled.div`
  display: flex;
  gap: 2rem;
`;

export default function OrderForm({onClose}) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const totalAmount = useSelector(getTotalPrice);
  const [address1, setAddress] = useState("");
  const [position1, setPosition] = useState(null);
  const { web3Data } = useWeb3();
  const { web3, accounts, contract } = web3Data;
  const [paid,setPaid]=useState(false);
const {createOrder,isCreating}=useCreateOrder();
  const cart=useSelector(state=>getCart(state));
  const handleBuyPizza = async () => {
    if (!web3 || !contract || !accounts.length) {
      console.error('Web3, contract, or accounts not initialized properly');
      return;
    }

    try {
      const amountInWei = web3.utils.toWei(totalAmount.toFixed(1), 'ether');

      await contract.methods.buyPizza(amountInWei).send({
        from: accounts[0],
        gas: 300000,
        value: amountInWei,
      });
   setPaid(true);
      console.log('Pizza purchased successfully');
    } catch (error) {
      console.error('Error purchasing pizza:', error);
    }
  };

  async function handleGetPosition() {
    const { address, position } = await fetchAddress();
    console.log(address)
    setAddress(address);
    setPosition(position);
  }

  const onSubmit = (data) => {
    console.log(data,cart);
const newObj={
    orderDate:data.orderDate,
    totalPrice:totalAmount,
    status:"confirmed",
    cart:cart,
    isPaid:paid,
    address:address1,
    phoneNumber:data.phoneNumber
}
console.log(newObj)
createOrder(newObj);

onClose?.()
    // Handle form submission, e.g., send the order to the server
  };

  return (
    <Forms onSubmit={handleSubmit(onSubmit)}>
      <Heading type="h3" color='#d44f00'>Order Form</Heading>
      <FormRow1 labelColor='#d44f00' title="Order Date" error={errors?.orderDate?.message}>
        <Input type="date" id="orderDate" {...register("orderDate", { required: "Order Date is required" })} />
      </FormRow1>
      <FormRow1 labelColor='#d44f00' title="Address" >
        <Div>
          <Input type="text" id="address" defaultValue={address1} {...register("address")} />
          <Button type="button" size="small" color="#F5F5DC" backgroundHover="#EC5800" backgroundColor="#FF7F50" onClick={handleGetPosition}>Get Position</Button>
        </Div>
      </FormRow1>
      <FormRow1 labelColor='#d44f00' title="Phone Number" error={errors?.phoneNumber?.message}>
        <Input type="number" id="phoneNumber" {...register("phoneNumber", { required: "Phone Number is required" })} />
      </FormRow1>
      <FormRow1 labelColor='#d44f00' title='Payment'>
        <Div>
          <Input type="number" defaultValue={totalAmount.toFixed(1)} />
          <FormButton hover="#e66060" disabled={paid} background="#ff6b6b" type='button' color="#F5F5DC" onClick={handleBuyPizza}>{paid?"Paid":"Pay"}</FormButton>
        </Div>
      </FormRow1>
      <FormRow1>
        <FormButton disabled={!paid||!address1} background="#FF7F50" color="#F5F5DC" hover="#EC5800" type="submit">Order</FormButton>
      </FormRow1>
    </Forms>
  );
}
