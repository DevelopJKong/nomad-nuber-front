import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import tw from "twin.macro";
import Dish from "../../components/dish";
import { restaurant, restaurantVariables } from "../../__generated__/restaurant";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";
import DishOption from "../../components/dish-option";
import { createOrder, createOrderVariables } from "../../__generated__/createOrder";

const Container = styled.div``;

const Header = styled.div`
   ${tw`bg-center bg-cover py-48`}
`;

const Content = styled.div`
   ${tw`bg-white w-3/12 py-4 pl-4`}
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
   ${tw`text-lg font-medium focus:outline-none text-white px-7 py-5  ml-2 mr-2 transition-colors bg-lime-600 hover:bg-lime-700`}
`;

const BtnWrapper = styled.div`
   ${tw`flex items-center`}
`;
const CancelBtn = styled(DishBtn)`
   ${tw`px-10 bg-black hover:bg-black mr-3`}
`;
const ConfirmBtn = styled(DishBtn)``;

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
         orderId
      }
   }
`;

interface IRestaurantParams {
   id: string;
}

const Restaurant = () => {
   const params = useParams<IRestaurantParams>();
   const history = useHistory();
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

   const addOptionToItem = (dishId: number, optionName: string) => {
      if (!isSelected(dishId)) {
         return;
      }
      const oldItem = getItem(dishId);
      if (oldItem) {
         const hasOption = Boolean(oldItem.options?.find((aOption) => aOption.name === optionName));

         if (!hasOption) {
            removeFromOrder(dishId);
            setOrderItems((current) => [{ dishId, options: [{ name: optionName }, ...oldItem.options!] }, ...current]);
         }
      }
   };

   const getOptionFromItem = (item: CreateOrderItemInput, optionName: string) => {
      return item.options?.find((option) => option.name === optionName);
   };

   const isOptionSelected = (dishId: number, optionName: string): boolean => {
      const item = getItem(dishId);
      if (item) {
         return Boolean(getOptionFromItem(item, optionName));
      }
      return false;
   };

   const removeOptionFromItem = (dishId: number, optionName: string) => {
      if (!isSelected(dishId)) {
         return;
      }
      const oldItem = getItem(dishId);

      if (oldItem) {
         removeFromOrder(dishId);
         setOrderItems((current) => [
            {
               dishId,
               options: oldItem.options?.filter((option) => option.name !== optionName),
            },
            ...current,
         ]);
         return oldItem.options?.filter((option) => option.name !== optionName);
      }
   };

   const triggerCancelOrder = () => {
      setOrderStarted(false);
      setOrderItems([]);
   };
   const onCompleted = (data: createOrder) => {
      const {
         createOrder: { ok, orderId },
      } = data;
      if (data.createOrder.ok) {
         history.push(`/orders/${orderId}`);
      }
   };
   const [createOrderMutation, { loading: placingOrder }] = useMutation<createOrder, createOrderVariables>(CREATE_ORDER_MUTATION, {
      onCompleted,
   });

   const triggerConfirmOrder = () => {
      if (placingOrder) {
         return;
      }

      if (orderItems.length === 0) {
         alert("Can't place empty order");
         return;
      }
      const ok = window.confirm("You are about to place an order");
      if (ok) {
         createOrderMutation({
            variables: {
               input: {
                  restaurantId: Number(params.id),
                  items: orderItems,
               },
            },
         });
      }
   };

   return (
      <Container>
         <Header style={{ backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})` }}></Header>
         <Content>
            <Title>{data?.restaurant.restaurant?.name}</Title>
            <CategoryName>{data?.restaurant.restaurant?.category?.name}</CategoryName>
         </Content>
         <DishWrapper>
            {!orderStarted && <DishBtn onClick={triggerStartOrder}>Start Order</DishBtn>}
            {orderStarted && (
               <BtnWrapper>
                  <ConfirmBtn onClick={triggerConfirmOrder}>Confirm Order</ConfirmBtn>
                  <CancelBtn onClick={triggerCancelOrder}>Cancel Order</CancelBtn>
               </BtnWrapper>
            )}

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
                        <DishOption
                           key={index}
                           dishId={dish.id}
                           addOptionToItem={addOptionToItem}
                           removeOptionFromItem={removeOptionFromItem}
                           isSelected={isOptionSelected(dish.id, option.name)}
                           name={option.name}
                           extra={option.extra}
                        />
                     ))}
                  </Dish>
               ))}
            </DishGrid>
         </DishWrapper>
      </Container>
   );
};

export default Restaurant;
