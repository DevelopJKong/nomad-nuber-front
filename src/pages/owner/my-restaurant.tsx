import React, { useEffect } from "react";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Link, useHistory, useParams } from "react-router-dom";
import { DISH_FRAGMENT, FULL_ORDER_FRAGMENT, ORDERS_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import styled from "styled-components";
import tw from "twin.macro";
import Dish from "../../components/dish";
// import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie } from "victory";
import { Helmet } from "react-helmet-async";
import { useMe } from "../../hooks/useMe";
import {
   CreatePaymentInput,
   CreatePaymentOutput,
   MyRestaurantInput,
   MyRestaurantOutput,
   PendingOrdersSubscription,
} from "../../generated/graphql";
const Wrapper = styled.div``;

const Image = styled.div`
   ${tw`bg-gray-700 py-28 bg-center bg-cover`}
`;

const Container = styled.div`
   ${tw`container mt-10`}
`;

const Title = styled.h2`
   ${tw`text-4xl font-medium mb-10`}
`;

const AddLink = styled(Link)`
   ${tw`mr-8 text-white bg-gray-800 py-3 px-10`}
`;

const PromotionLink = styled.span`
   ${tw`cursor-pointer text-white bg-lime-700 py-3 px-10`}
`;

const Upload = styled.div`
   ${tw`mt-10`}
`;

const UploadText = styled.h4``;

const DishWrapper = styled.div`
   ${tw`grid mt-16 md:grid-cols-4 gap-x-5 gap-y-10`}
`;

export const MY_RESTAURANT_QUERY = gql`
   query myRestaurant($input: MyRestaurantInput!) {
      myRestaurant(input: $input) {
         ok
         error
         restaurant {
            ...RestaurantParts
            menu {
               ...DishParts
            }
            orders {
               ...OrderParts
            }
         }
      }
   }
   ${RESTAURANT_FRAGMENT}
   ${DISH_FRAGMENT}
   ${ORDERS_FRAGMENT}
`;

const CREATE_PAYMENT_MUTATION = gql`
   mutation createPayment($input: CreatePaymentInput!) {
      createPayment(input: $input) {
         ok
         error
      }
   }
`;

const PENDING_ORDERS_SUBSCRIPTION = gql`
   subscription pendingOrders {
      pendingOrders {
         ...FullOrderParts
      }
   }
   ${FULL_ORDER_FRAGMENT}
`;

interface IParams {
   id: string;
}
export const MyRestaurant = () => {
   const { id } = useParams<IParams>();
   const { data } = useQuery<{ myRestaurant: MyRestaurantOutput }, { input: MyRestaurantInput }>(MY_RESTAURANT_QUERY, {
      variables: {
         input: {
            id: Number(id),
         },
      },
   });
   const onCompleted = (data: { createPayment: CreatePaymentOutput }) => {
      if (data.createPayment.ok) {
         alert("Your restaurant is being promoted!");
      }
   };
   const [createPaymentMutation, { loading: _loading }] = useMutation<
      { createPayment: CreatePaymentOutput },
      { input: CreatePaymentInput }
   >(CREATE_PAYMENT_MUTATION, {
      onCompleted,
   });
   const { data: userData } = useMe();
   const triggerPaddle = () => {
      if (userData?.me.email) {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         window.Paddle.Setup({ vendor: 161391 });

         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         window.Paddle.Setup({ product: 12345, email: userData.me.email });

         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         window.Paddle.Checkout.open({
            product: 638793,
            email: userData.me.email,
            successCallback: (data: any) => {
               createPaymentMutation({
                  variables: {
                     input: {
                        transactionId: data.checkout.id,
                        restaurantId: Number(id),
                     },
                  },
               });
            },
         });
      }
   };

   const { data: subscriptionData } = useSubscription<PendingOrdersSubscription>(PENDING_ORDERS_SUBSCRIPTION);
   const history = useHistory();
   useEffect(() => {
      if (subscriptionData?.pendingOrders.id) {
         history.push(`/orders/${subscriptionData.pendingOrders.id}`);
      }
   }, [subscriptionData]);

   return (
      <Wrapper>
         <Helmet>
            <title>{data?.myRestaurant.restaurant?.name || "Loading..."} | Nuber Eats</title>
            <script src='https://cdn.paddle.com/paddle/paddle.js'></script>
         </Helmet>
         <Image style={{ backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})` }} />
         <Container>
            <Title>{data?.myRestaurant.restaurant?.name || "Loading..."}</Title>
            <AddLink to={`/restaurants/${id}/add-dish`}>Add Dish &rarr;</AddLink>
            <PromotionLink onClick={triggerPaddle}>Buy Promotion</PromotionLink>
            <Upload>
               {data?.myRestaurant.restaurant?.menu.length === 0 ? (
                  <UploadText>Please upload a dish</UploadText>
               ) : (
                  <DishWrapper>
                     {data?.myRestaurant.restaurant?.menu.map((dish: any, index: number) => (
                        <Dish key={index} name={dish.name} description={dish.description} price={dish.price} />
                     ))}
                  </DishWrapper>
               )}
            </Upload>
         </Container>
      </Wrapper>
   );
};
