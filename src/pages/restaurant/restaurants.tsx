import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import tw from "twin.macro";

const Container = styled.div``;

const Form = styled.div`
  ${tw`bg-gray-800 w-full py-40 flex items-center justify-center`}
`;

const Input = styled.input`
  ${tw`rounded-md border-0 w-3/12`}
`;

const CategoryWrapper = styled.div`
  ${tw`max-w-screen-2xl mx-auto mt-8`}
`;

const CategoryContainer = styled.div`
  ${tw`flex justify-around max-w-xs mx-auto`}
`;

const Categories = styled.div.attrs(() => {
  return {
    className: "group",
  };
})`
  ${tw`flex flex-col items-center`}
`;

const Category = styled.div`
  ${tw`w-14 h-14 group-hover:bg-gray-100 rounded-full bg-red-500 bg-cover cursor-pointer`}
`;

const Text = styled.span`
  ${tw`mt-1 text-sm text-center font-medium`}
`;

const RestaurantWrapper = styled.div`
  ${tw`grid mt-10 grid-cols-3 gap-7`}
`;

const Restaurant = styled.div`
  ${tw`bg-red-500 py-28 bg-cover bg-center`}
`;

const RestaurantTitle = styled.h3`
  ${tw`text-lg font-medium`}
`;

const RestaurantContent = styled.span`
  ${tw`border-t-2 border-gray-200`}
`;

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

const Restaurants = () => {
  const { data, loading, error } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page: 1,
        },
      },
    },
  );

  return (
    <Container>
      <Form>
        <Input type='Search' placeholder='Search restaurant...' />
      </Form>
      {!loading && (
        <CategoryWrapper>
          <CategoryContainer>
            {data?.allCategories.categories?.map((category, index) => (
              <Categories key={index}>
                <Category style={{ backgroundImage: `url(${category.coverImage})` }}>
                  {category.name}
                </Category>
                <Text>{category.name}</Text>
              </Categories>
            ))}
          </CategoryContainer>
          <RestaurantWrapper>
            {data?.restaurants.results?.map((restaurant, index) => (
              <div key={index}>
                <Restaurant
                  style={{ backgroundColor: `url(${restaurant.coverImage})` }}
                ></Restaurant>
                <RestaurantTitle>{restaurant.name}</RestaurantTitle>
                <RestaurantContent>{restaurant.category?.name}</RestaurantContent>
              </div>
            ))}
          </RestaurantWrapper>
        </CategoryWrapper>
      )}
    </Container>
  );
};

export default Restaurants;
