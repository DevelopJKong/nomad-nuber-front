import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import tw from "twin.macro";
import Dish from "../../components/dish";
import { restaurant, restaurantVariables } from "../../__generated__/restaurant";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";

const Container = styled.div``;

const Header = styled.div`
  ${tw`bg-red-500 bg-center bg-cover py-48`}
`;

const Content = styled.div`
  ${tw`bg-white w-3/12 py-4 pl-48`}
`;

const Title = styled.h4`
  ${tw`text-4xl mb-3`}
`;

const CategoryName = styled.h5`
  ${tw`text-sm font-light`}
`;

const Address = styled.h6`
  ${tw`text-sm font-light`}
`;

const DishWrapper = styled.div`
  ${tw`container`}
`;

const DishGrid = styled.div`
  ${tw`w-full grid my-16 md:grid-cols-3 gap-x-5 gap-y-10`}
`;

const DishBtn = styled.button`
  ${tw`text-lg font-medium focus:outline-none text-white py-4  transition-colors bg-lime-600 hover:bg-lime-700`}
`;

const Option = styled.span.attrs(() => {
  return {
    className: `${({ getOptionFromItem }: { getOptionFromItem: boolean }) =>
      getOptionFromItem ? "border-gray-800" : ""}`,
  };
})<{ getOptionFromItem: boolean }>`
  ${tw`flex border items-center`}
`;

const OptionName = styled.p`
  ${tw`mr-2`}
`;

const OptionExtra = styled.p`
  ${tw`text-sm opacity-75`}
`;

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IRestaurantParams {
  id: string;
}

const Restaurant = () => {
  const params = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);

  const triggerStartOrder = () => {
    setOrderStarted(true);
  };

  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };

  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };
  const addItemToOrder = (dishId: number) => {
    if (orderItems.find((order) => order.dishId === dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };

  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) => current.filter((dish) => dish.dishId !== dishId));
  };

  const addOptionToItem = (dishId: number, option: any) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(oldItem.options?.find((aOption) => aOption.name === option.name));

      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [option, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };

  const getOptionFromItem = (item: CreateOrderItemInput, optionName: string) => {
    return item.options?.find((option) => option.name === optionName);
  };
  const isOptionSelected = (dishId: number, optionName: string): boolean | void => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
  };

  return (
    <Container>
      <Header style={{ backgroundColor: `url(${data?.restaurant.restaurant?.coverImg})` }}></Header>
      <Content>
        <Title>{data?.restaurant.restaurant?.name}</Title>
        <CategoryName>{data?.restaurant.restaurant?.category?.name}</CategoryName>
      </Content>
      <DishWrapper>
        <DishBtn onClick={triggerStartOrder}>{orderStarted ? "Ordering" : "Start Order"}</DishBtn>
        <DishGrid>
          {data?.restaurant.restaurant?.menu.map((dish, index) => (
            <Dish
              isSelected={isSelected(dish.id)}
              id={dish.id}
              orderStarted={orderStarted}
              key={index}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              isCustomer={true}
              options={dish.options}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map((option, index) => (
                <Option
                  onClick={() =>
                    addOptionToItem
                      ? addOptionToItem(dish.id, {
                          name: option.name,
                        })
                      : null
                  }
                  key={index}
                  getOptionFromItem={getOptionFromItem(dish.id, option.name)}
                >
                  <OptionName>{option.name}</OptionName>
                  <OptionExtra>(${option.extra})</OptionExtra>
                </Option>
              ))}
            </Dish>
          ))}
        </DishGrid>
      </DishWrapper>
    </Container>
  );
};

export default Restaurant;
