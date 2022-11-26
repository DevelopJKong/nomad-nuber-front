import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import styled from "styled-components";
import tw from "twin.macro";
import { myRestaurant, myRestaurantVariables } from "../../__generated__/myRestaurant";
import Dish from "../../components/dish";
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
      </Container>
    </Wrapper>
  );
};
