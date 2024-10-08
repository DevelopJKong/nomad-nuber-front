import React from "react";
import { gql, useQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import tw from "twin.macro";
import { Link as RouterLink } from "react-router-dom";
import { RestaurantWrapper } from "../restaurant/restaurants";
import Restaurant from "../../components/restaurant";
import { MyRestaurantsOutput } from "../../generated/graphql";

const Container = styled.div``;

const Content = styled.div`
   ${tw`max-w-screen-2xl mx-auto mt-32`}
`;

const Title = styled.h2`
   ${tw`text-4xl font-medium mb-5`}
`;

const SubTitle = styled.h4`
   ${tw`text-xl mb-5`}
`;

const Link = styled(RouterLink)`
   ${tw`text-lime-600 hover:underline`}
`;

export const MY_RESTAURANTS_QUERY = gql`
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
   const { data } = useQuery<{ myRestaurants: MyRestaurantsOutput }>(MY_RESTAURANTS_QUERY);

   return (
      <Container>
         <Helmet>
            <title>My Restaurant | Nuber Eats</title>
         </Helmet>
         <Content>
            <Title>My Restaurants</Title>
            {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 ? (
               <>
                  <SubTitle>You have no restaurants.</SubTitle>
                  <Link to='/add-restaurant'>Create one &rarr;</Link>
               </>
            ) : (
               <RestaurantWrapper>
                  {data?.myRestaurants.restaurants.map((restaurant: any) => (
                     <Restaurant
                        key={restaurant.id}
                        id={restaurant.id + ""}
                        coverImg={restaurant.coverImg}
                        name={restaurant.name}
                        categoryName={restaurant.category?.name}
                     />
                  ))}
               </RestaurantWrapper>
            )}
         </Content>
      </Container>
   );
};
