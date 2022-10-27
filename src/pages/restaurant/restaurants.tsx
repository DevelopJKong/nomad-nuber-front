import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import tw from "twin.macro";
import Restaurant from "../../components/restaurant";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { RESTAURANT_FRAGMENT } from "../../fragments";
const Container = styled.div``;

const Form = styled.div`
  ${tw`bg-gray-800 w-full py-40 flex items-center justify-center`}
`;

const Input = styled.input`
  ${tw`focus:outline-none focus:border-gray-500 p-3 border-2 text-lg border-gray-200 transition-colors rounded-md  w-3/4 md:w-3/12`}
`;

const CategoryWrapper = styled.div`
  ${tw`max-w-screen-2xl pb-20 mx-auto mt-8`}
`;

const CategoryContainer = styled.div`
  ${tw`flex justify-around max-w-xs mx-auto`}
`;

const CategoryGrid = styled.div`
  ${tw`grid mt-16 lg:grid-cols-3 gap-x-5 gap-y-10`}
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
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

const Restaurants = () => {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { data, loading } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(
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
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<IFormProps>();
  const onValid = async (data: IFormProps) => {
    const { searchTerm } = data;
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <Container>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          type='Search'
          placeholder='Search restaurant...'
          {...register("searchTerm", { required: true })}
        />
      </Form>
      {!loading && (
        <CategoryWrapper>
          <CategoryContainer>
            <CategoryGrid>
              {data?.allCategories.categories?.map((category, index) => (
                <Categories key={index}>
                  <Category style={{ backgroundImage: `url(${category.coverImage})` }}>
                    {category.name}
                  </Category>
                  <Text>{category.name}</Text>
                </Categories>
              ))}
            </CategoryGrid>
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
