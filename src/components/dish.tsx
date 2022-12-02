import { mergeOptions } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";

const Container = styled.div`
  ${tw`px-8 pt-3 pb-8 border hover:border-gray-800 transition-all`}
`;

const Content = styled.div`
  ${tw`mb-5`}
`;

const Name = styled.h3`
  ${tw`text-lg font-medium mb-5`}
`;

const Description = styled.h4`
  ${tw`font-medium`}
`;

const Price = styled(Description)``;

const DishTitle = styled.h5`
  ${tw`mt-5 mb-3 font-medium`}
`;

const OptionName = styled.p`
  ${tw`mr-2`}
`;

const OptionExtra = styled.p`
  ${tw`text-sm opacity-75`}
`;

interface IDishProps {
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
}

const Dish: React.FC<IDishProps> = ({ description, name, price, isCustomer = false, options }) => {
  return (
    <Container>
      <Content>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </Content>
      <Price>${price}</Price>

      {isCustomer && options && options?.length !== 0 && (
        <>
          <DishTitle>Dish</DishTitle>
          {options?.map((option, index) => {
            <span key={index}>
              <OptionName>{option.name}</OptionName>
              <OptionExtra>(${option.extra})</OptionExtra>
            </span>;
          })}
        </>
      )}
    </Container>
  );
};

export default Dish;
