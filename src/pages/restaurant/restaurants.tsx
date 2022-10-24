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

const Categories = styled.div`
  ${tw`flex flex-col items-center`}
`;

const Category = styled.div`
  ${tw`w-14 h-14 hover:bg-gray-100 rounded-full bg-red-500 bg-cover cursor-pointer`}
`;

const Text = styled.span`
  ${tw`mt-1 text-sm text-center font-medium`}
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
        </CategoryWrapper>
      )}
    </Container>
  );
};

export default Restaurants;
