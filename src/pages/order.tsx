import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Helmet } from "react-helmet-async";
import { FULL_ORDER_FRAGMENT } from "../fragments";
import { useMe } from "../hooks/useMe";
import { editOrder, editOrderVariables } from "../__generated__/editOrder";
import { getOrder, getOrderVariables } from "../__generated__/getOrder";
import { orderUpdates } from "../__generated__/orderUpdates";
import { OrderStatus, UserRole } from "../__generated__/globalTypes";

const Container = styled.div`
  ${tw`mt-3 container flex justify-center`}
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

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const EDIT_ORDER = gql`
  mutation editOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;
interface IParams {
  id: string;
}

const Order = () => {
  const params = useParams<IParams>();
  const { data: userData } = useMe();
  const [editOrderMutation] = useMutation<editOrder, editOrderVariables>(EDIT_ORDER);
  const { data, subscribeToMore } = useQuery<getOrder, getOrderVariables>(GET_ORDER, {
    variables: {
      input: {
        id: Number(params.id),
      },
    },
  });
  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          input: {
            id: Number(params.id),
          },
        },

        updateQuery: (
          prev,
          { subscriptionData: { data: updateData } }: { subscriptionData: { data: orderUpdates } },
        ) => {
          if (!updateData) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...updateData.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);

  const onButtonClick = (newStatus: OrderStatus) => {
    editOrderMutation({
      variables: {
        input: {
          id: Number(params.id),
          status: newStatus,
        },
      },
    });
  };

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
          {userData?.me.role === UserRole.Client && (
            <Status>Status: {data?.getOrder.order?.status}</Status>
          )}
          {userData?.me.role === UserRole.Owner && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Pending && (
                <button onClick={() => onButtonClick(OrderStatus.Cooking)}>Accept Order</button>
              )}
              {data?.getOrder.order?.status === OrderStatus.Cooking && (
                <button onClick={() => onButtonClick(OrderStatus.Cooked)}>Accept Order</button>
              )}
              {data?.getOrder.order?.status !== OrderStatus.Cooking &&
                data?.getOrder.order?.status !== OrderStatus.Pending && (
                  <Status>Status: {data?.getOrder.order?.status}</Status>
                )}
            </>
          )}
        </Table>
      </Content>
    </Container>
  );
};

export default Order;
