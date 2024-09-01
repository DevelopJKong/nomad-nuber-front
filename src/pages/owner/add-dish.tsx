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

const DeleteBtn = styled.span`
   ${tw`cursor-pointer text-white bg-red-500 py-1 px-2 mt-5 ml-1`}
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
   const [optionsNumber, setOptionsNumber] = useState<number[]>([]);

   const onAddOptionClick = () => {
      setOptionsNumber((current) => [Date.now(), ...current]);
   };

   const onDeleteClick = (index: number) => {
      setOptionsNumber((current) => current.filter((id) => id !== index));
      setValue(`${index}-optionName`, "");
      setValue(`${index}-optionExtra`, "");
   };

   const [createDishMutation, { loading }] = useMutation<createDish, createDishVariables>(CREATE_DISH_MUTATION, {
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
   });

   const onSubmit = (data: IForm) => {
      const { name, price, description, ...rest } = data;
      const optionObjects = optionsNumber.map((theId) => ({
         name: rest[`${theId}-optionName`],
         extra: Number(rest[`${theId}-optionExtra`]),
      }));
      createDishMutation({
         variables: {
            input: {
               name,
               photo: "",
               price: Number(price),
               description,
               restaurantId: Number(restaurantId),
               options: optionObjects,
            },
         },
      });
      history.goBack();
   };

   const {
      register,
      handleSubmit,
      setValue,
      formState: { isValid },
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
               {optionsNumber.length !== 0 &&
                  optionsNumber.map((id) => (
                     <OptionInputBox key={id}>
                        <OptionInputFirst type='text' placeholder='Option Name' {...register(`${id}-optionName`)} />
                        <OptionInputSecond type='number' placeholder='Option Extra' defaultValue={0} {...register(`${id}-optionExtra`)} />
                        <DeleteBtn onClick={() => onDeleteClick(id)}>Delete Options</DeleteBtn>
                     </OptionInputBox>
                  ))}
            </Content>

            <Button loading={loading} canClick={isValid} actionText={"Create Dish"} />
         </Form>
      </Container>
   );
};

export default AddDish;
