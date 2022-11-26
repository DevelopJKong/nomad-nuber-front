import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import styled from "styled-components";
import tw from "twin.macro";
import { myRestaurant, myRestaurantVariables } from "../../__generated__/myRestaurant";
import Dish from "../../components/dish";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
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

const PromotionLink = styled(Link)`
  ${tw`text-white bg-lime-700 py-3 px-10`}
`;

const Upload = styled.div`
  ${tw`mt-10`}
`;

const UploadText = styled.h4``;

const DishWrapper = styled.div`
  ${tw`grid mt-16 md:grid-cols-4 gap-x-5 gap-y-10`}
`;

const SaleWrapper = styled.div`
  ${tw`mt-20 mb-10`}
`;

const SaleText = styled.h4`
  ${tw`text-center`}
`;

const Sale = styled.div`
  ${tw`max-w-md w-full mx-auto`}
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
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IParams {
  id: string;
}
export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        id: Number(id),
      },
    },
  });
  return (
    <Wrapper>
      <Image style={{ backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})` }} />
      <Container>
        <Title>{data?.myRestaurant.restaurant?.name || "Loading..."}</Title>
        <AddLink to={`/restaurants/${id}/add-dish`}>Add Dish &rarr;</AddLink>
        <PromotionLink to={""}>Buy Promotion</PromotionLink>
        <Upload>
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <UploadText>Please upload a dish</UploadText>
          ) : (
            <DishWrapper>
              {data?.myRestaurant.restaurant?.menu.map((dish, index) => (
                <Dish
                  key={index}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                />
              ))}
            </DishWrapper>
          )}
        </Upload>
        <SaleWrapper>
          <SaleText>Sales</SaleText>
          <Sale>
            <VictoryChart domainPadding={20}>
              <VictoryAxis
                animate={{
                  duration: 2000,
                  easing: "bounce",
                }}
                dependentAxis
                tickValues={[20, 30, 40, 50, 60]}
              />

              <VictoryAxis label='Amount of Money' />
              <VictoryBar
                data={[
                  { x: 10, y: 20 },
                  { x: 20, y: 10 },
                  { x: 35, y: 5 },
                  { x: 45, y: 99 },
                ]}
              />
            </VictoryChart>
          </Sale>
        </SaleWrapper>
      </Container>
    </Wrapper>
  );
};
