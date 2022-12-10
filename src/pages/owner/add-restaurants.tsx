import React, { useState } from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import tw from "twin.macro";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { Input as LoginInput } from "../login";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";
import { useHistory } from "react-router-dom";
import { createRestaurant, createRestaurantVariables } from "../../__generated__/createRestaurant";

const Container = styled.div`
  ${tw`container flex flex-col items-center mt-10`}
`;

const TitleTag = styled.h4`
  ${tw`font-semibold text-2xl mb-3`}
`;

const Form = styled.form`
  ${tw`grid max-w-screen-sm gap-3 mt-5 w-full mb-5`}
`;

const Input = styled(LoginInput)``;

const FileBox = styled.div``;

const FileInput = styled.input``;

const ErrorBox = styled.div``;

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const AddRestaurants = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;

    if (ok) {
      const { name, categoryName, address } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImg: imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
      history.push("/");
    }
  };

  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
    // refetchQueries: [{ query: MY_RESTAURANTS_QUERY }],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data: IFormProps) => {
    const { file, name, categoryName, address } = data;
    try {
      setUploading(true);
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const {
        data: { url: coverImg },
      } = await axios(`http://localhost:5000/uploads/upload`, {
        method: "POST",
        data: formBody,
      });
      setImageUrl(coverImg);
      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Add Restaurant</title>
      </Helmet>
      <TitleTag>Add Restaurant</TitleTag>
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

        {errors?.name?.message && <ErrorBox>{errors.name.message}</ErrorBox>}

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

        {errors?.address?.message && <ErrorBox>{errors?.address?.message}</ErrorBox>}

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

        <FileBox>
          <FileInput
            type='file'
            accept='image/*'
            {...register("file", {
              required: true,
            })}
          />
        </FileBox>

        <Button loading={uploading} canClick={isValid} actionText='Create Restaurant' />
        {data?.createRestaurant?.error && <FormError errorMessage={data.createRestaurant.error} />}
      </Form>
    </Container>
  );
};

export default AddRestaurants;
