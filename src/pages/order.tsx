import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { getOrder, getOrderVariables } from "../__generated__/getOrder";

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        id
        status
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;

interface IParams {
  id: string;
}

const Order = () => {
  const params = useParams<IParams>();
  const { data } = useQuery<getOrder, getOrderVariables>(GET_ORDER, { variables: {
    input: {
        id: Number(params.id)
    }
  } });
  return <div>{params.id}</div>;
};

export default Order;
