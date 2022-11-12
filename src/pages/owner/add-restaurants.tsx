import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import tw from "twin.macro";
import { Button } from "../../components/button";
import { createRestaurant, createRestaurantVariables } from "../../__generated__/createRestaurant";
import { CREATE_ACCOUNT_MUTATION } from "../create-account";
import { Input as LoginInput } from "../login";

const Container = styled.div`
  ${tw`container`}
`;

const Title = styled.h1``;

const Form = styled.form``;

const Input = styled(LoginInput)``;

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

const AddRestaurants = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_ACCOUNT_MUTATION);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onSubmit = (data: IFormProps) => {
    console.log(data);
  };

  return (
    <Container>
      <Helmet>
        <title>Add Restaurant</title>
      </Helmet>
      <Title>Add Restaurant</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          placeholder='Name'
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
        <Input
          type='text'
          placeholder='Address'
          {...register("address", {
            required: {
              value: true,
              message: "Address is required",
            },
          })}
        />

        <Input
          type='text'
          placeholder='Category Name'
          {...register("categoryName", {
            required: {
              value: true,
              message: "Category Name is required",
            },
          })}
        />
        <Button loading={loading} canClick={isValid} actionText='Create Restaurant' />
      </Form>
    </Container>
  );
};

export default AddRestaurants;
