import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import tw from "twin.macro";
import Restaurant from "../../components/restaurant";
import { useState } from "react";

const Container = styled.div``;

const Form = styled.div`
  ${tw`bg-gray-800 w-full py-40 flex items-center justify-center`}
`;

const Input = styled.input`
  ${tw`rounded-md border-0 w-3/12`}
`;

const CategoryWrapper = styled.div`
  ${tw`max-w-screen-2xl pb-20 mx-auto mt-8`}
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
  ${tw`grid mt-16 grid-cols-3 gap-x-5 gap-y-10`}
`;

const Pages = styled.div`
  ${tw`grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10`}
`;

const Pointer = styled.button`
  ${tw`focus:outline-none font-medium text-2xl`}
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
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    },
  );

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

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
              <Restaurant
                key={index}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
            e
          </RestaurantWrapper>
          <Pages>
            {page > 1 ? <Pointer onClick={onPrevPageClick}>&larr;</Pointer> : <div></div>}
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <Pointer onClick={onNextPageClick}>&rarr;</Pointer>
            ) : (
              <div></div>
            )}
          </Pages>
        </CategoryWrapper>
      )}
    </Container>
  );
};

export default Restaurants;
