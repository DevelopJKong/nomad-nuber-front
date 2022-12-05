import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";

const Container = styled.div.attrs(() => {
  return {
    className: `${({ isSelected }: { isSelected: boolean }) =>
      isSelected ? "border-gray-800" : " hover:border-gray-800"}`,
  };
})<{ isSelected: boolean }>`
  ${tw`px-8 pt-3 pb-8 border hover:border-gray-800 transition-all`}
`;

const Content = styled.div`
  ${tw`mb-5`}
`;

const Name = styled.h3`
  ${tw`text-lg font-medium flex items-center`}
`;

const Button = styled.button.attrs(() => {
  return {
    className: `${({ isSelected }: { isSelected: boolean }) =>
      isSelected ? "bg-red-500" : " bg-lime-600"}`,
  };
})<{ isSelected: boolean }>`
  ${tw`ml-3 py-1 px-3 focus:outline-none text-sm text-white`}
`;

const Description = styled.h4`
  ${tw`font-medium`}
`;

const Price = styled(Description)``;

const DishTitle = styled.h5`
  ${tw`mt-5 mb-3 font-medium`}
`;

const DishOptions = styled.div`
  ${tw`grid gap-2 justify-start`}
`;

interface IDishProps {
  id?: number;
  isSelected?: boolean;
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  orderStarted?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  addOptionToItem?: (dishId: number, options: any) => void;
  children?: React.ReactNode;
}

const Dish: React.FC<IDishProps> = ({
  id = 0,
  description,
  name,
  price,
  isCustomer = false,
  orderStarted = false,
  options,
  addItemToOrder,
  isSelected = false,
  removeFromOrder,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };

  return (
    <Container isSelected={isSelected}>
      <Content>
        <Name>
          {name}
          {orderStarted && (
            <Button isSelected={isSelected} onClick={onClick}>
              {isSelected ? "Remove" : "Add"}
            </Button>
          )}
        </Name>
        <Description>{description}</Description>
      </Content>
      <Price>${price}</Price>

      {isCustomer && options && options?.length !== 0 && (
        <div>
          <DishTitle>Dish Options:</DishTitle>
          <DishOptions>{dishOptions}</DishOptions>
        </div>
      )}
    </Container>
  );
};

export default Dish;
