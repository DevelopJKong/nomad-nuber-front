import React from "react";
import { gql, useQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { myRestaurants } from "../../__generated__/myRestaurants";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import tw from "twin.macro";
import { Link as RouterLink } from "react-router-dom";

const Container = styled.div``;

const Content = styled.div`
  ${tw`max-w-screen-2xl mx-auto mt-32`}
`;

const Title = styled.h2`
  ${tw`text-4xl font-medium mb-10`}
`;

const SubTitle = styled.h4`
  ${tw`text-xl mb-5`}
`;

const Link = styled(RouterLink)`
  ${tw`text-lime-600 hover:underline`}
`;

const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const { data } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);

  return (
    <Container>
      <Helmet>
        <title>My Restaurant | Nuber Eats</title>
      </Helmet>
      <Content>
        <Title>My Restaurants</Title>
        {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 && (
          <>
            <SubTitle>You have no restaurants.</SubTitle>
            <Link to='/add-restaurant'>Create one &rarr;</Link>
          </>
        )}
      </Content>
    </Container>
  );
};
