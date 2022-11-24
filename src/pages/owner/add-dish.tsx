import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";
import { createDish, createDishVariables } from "../../__generated__/createDish";

const Container = styled.div`
  ${tw`container flex flex-col items-center mt-52`}
`;

const Title = styled.h4`
  ${tw`font-semibold text-2xl mb-3`}
`;

const Form = styled.form`
  ${tw`grid max-w-screen-sm gap-3 mt-5 w-full mb-5`}
`;

const Input = styled.input`
  ${tw`focus:outline-none focus:border-gray-500 p-3 border-2 text-lg border-gray-200 transition-colors`}
`;

const Content = styled.div`
  ${tw`my-10`}
`;

const ContentTitle = styled.h4`
  ${tw`font-medium mb-3 text-lg`}
`;

const OptionText = styled.span`
  ${tw`cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5`}
`;

const OptionInputBox = styled.div`
  ${tw`mt-5`}
`;

const OptionInputFirst = styled.input`
  ${tw`py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2`}
`;

const OptionInputSecond = styled.input`
  ${tw`py-2 px-4 focus:outline-none focus:border-gray-600 border-2`}
`;

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

const AddDish = () => {
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();
  const [optionsNumber, setOptionsNumber] = useState(0);

  const onAddOptionClick = () => {
    setOptionsNumber((current) => current + 1);
  };

  const onDeleteClick = (index: number) => {
    setOptionsNumber((current) => current - 1);
    setValue(`${index}-optionName`, "");
    setValue(`${index}-optionExtra`, "");
  };

  const [createDishMutation, { loading }] = useMutation<createDish, createDishVariables>(
    CREATE_DISH_MUTATION,
    {
      refetchQueries: [
        {
          query: MY_RESTAURANT_QUERY,
          variables: {
            input: {
              id: Number(restaurantId),
            },
          },
        },
      ],
    },
  );

  const onSubmit = (data: IForm) => {
    const { name, price, description } = data;
    createDishMutation({
      variables: {
        input: {
          name,
          photo: "",
          price: Number(price),
          description,
          restaurantId: Number(restaurantId),
        },
      },
    });
    history.goBack();
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IForm>({
    mode: "onChange",
  });

  return (
    <Container>
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <Title>Add Dish</Title>
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
          type='number'
          min={0}
          placeholder='Price'
          {...register("price", {
            required: {
              value: true,
              message: "Price is required",
            },
          })}
        />
        <Input
          type='text'
          placeholder='Description'
          {...register("description", {
            required: {
              value: true,
              message: "Description is required",
            },
          })}
        />
        <Content>
          <ContentTitle>Dish Options</ContentTitle>
          <OptionText onClick={onAddOptionClick}>Add Dish Option</OptionText>
          {optionsNumber !== 0 &&
            Array.from(new Array(optionsNumber)).map((_, index) => (
              <OptionInputBox key={index}>
                <OptionInputFirst
                  type='text'
                  placeholder='Option Name'
                  {...register(`${index}-optionName`)}
                />
                <OptionInputSecond
                  type='number'
                  placeholder='Option Extra'
                  {...register(`${index}-optionExtra`)}
                />
                <span onClick={() => onDeleteClick(index)}>&nbsp;Delete Options</span>
              </OptionInputBox>
            ))}
        </Content>

        <Button loading={loading} canClick={isValid} actionText={"Create Dish"} />
      </Form>
    </Container>
  );
};

export default AddDish;
