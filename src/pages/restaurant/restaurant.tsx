import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { restaurant, restaurantVariables } from "../../__generated__/restaurant";
import tw from "twin.macro";
import Dish from "../../components/dish";

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
  ${tw`grid my-16 md:grid-cols-3 gap-x-5 gap-y-10`}
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
  return (
    <Container>
      <Header style={{ backgroundColor: `url(${data?.restaurant.restaurant?.coverImg})` }}></Header>
      <Content>
        <Title>{data?.restaurant.restaurant?.name}</Title>
        <CategoryName>{data?.restaurant.restaurant?.category?.name}</CategoryName>
      </Content>
      <DishWrapper>
        {data?.restaurant.restaurant?.menu.map((dish, index) => (
          <Dish
            key={index}
            name={dish.name}
            description={dish.description}
            price={dish.price}
            isCustomer={true}
            options={dish.options}
          />
        ))}
      </DishWrapper>
    </Container>
  );
};

export default Restaurant;
