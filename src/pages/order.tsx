import React, { useEffect } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Helmet } from "react-helmet-async";
import { FULL_ORDER_FRAGMENT } from "../fragments";
import { getOrder, getOrderVariables } from "../__generated__/getOrder";

const Container = styled.div`
  ${tw`mt-32 container flex justify-center`}
`;

const Content = styled.div`
  ${tw`border border-gray-800 w-full max-w-screen-sm flex flex-col justify-center`}
`;

const Title = styled.h3`
  ${tw`bg-gray-800 w-full py-5 text-white text-center text-xl`}
`;

const Price = styled.h4`
  ${tw`p-5 pt-10 text-3xl text-center`}
`;

const Table = styled.div`
  ${tw`p-5 text-xl grid gap-6`}
`;

const Row = styled.div`
  ${tw`border-t pt-5 border-gray-700`}
`;

const RowText = styled.span`
  ${tw`font-medium`}
`;

const Status = styled.span`
  ${tw`text-center mt-5 mb-3 text-2xl text-lime-600`}
`;

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...FullOrderParts
      }
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

const Order = () => {
  const params = useParams<IParams>();
  const { data, subscribeToMore } = useQuery<getOrder, getOrderVariables>(GET_ORDER, {
    variables: {
      input: {
        id: Number(params.id),
      },
    },
  });
  // useEffect(() => {
  //   if (data?.getOrder.ok) {
  //     subscribeToMore({
  //       document: ORDER_SUBSCRIPTION,
  //       variables: {
  //         input: {
  //           id: +params.id,
  //         },
  //       },
  //       updateQuery: (
  //         prev,
  //         { subscriptionData: { data } }: { subscriptionData: { data: orderUpdates } },
  //       ) => {
  //         if (!data) return prev;
  //         return {
  //           getOrder: {
  //             ...prev.getOrder,
  //             order: {
  //               ...data.orderUpdates,
  //             },
  //           },
  //         };
  //       },
  //     });
  //   }
  // }, [data]);
  return (
    <Container>
      <Helmet>
        <title>Order #{params.id} | Nuber Eats</title>
      </Helmet>
      <Content>
        <Title>Order #{params.id}</Title>
        <Price>{data?.getOrder.order?.total}</Price>
        <Table>
          <Row>
            Prepared By: <RowText>{data?.getOrder.order?.restaurant?.name}</RowText>
          </Row>
          <Row>
            Deliver To: <RowText>{data?.getOrder.order?.customer?.email}</RowText>
          </Row>
          <Row>
            Driver: <RowText>{data?.getOrder.order?.driver?.email || "Not yet."}</RowText>
          </Row>
          <Status>Status: {data?.getOrder.order?.status}</Status>
        </Table>
      </Content>
    </Container>
  );
};

export default Order;
