import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT, CATEGORY_FRAGMENT } from "../../fragments";
import { CategoryInput, CategoryOutput } from "../../generated/graphql";

const CATEGORY_QUERY = gql`
   query category($input: CategoryInput!) {
      category(input: $input) {
         ok
         error
         totalPages
         totalResults
         restaurants {
            ...RestaurantParts
         }
         category {
            ...CategoryParts
         }
      }
   }
   ${RESTAURANT_FRAGMENT}
   ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
   slug: string;
}

const Category = () => {
   const params = useParams<ICategoryParams>();
   const { data: _data, loading: _loading } = useQuery<{ category: CategoryOutput }, { input: CategoryInput }>(CATEGORY_QUERY, {
      variables: {
         input: {
            page: 1,
            slug: params.slug,
         },
      },
   });
   return <h1>Category</h1>;
};

export default Category;
