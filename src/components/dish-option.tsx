import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Option = styled.span.attrs(() => {
  return {
    className: `${({ getOptionFromItem }: { getOptionFromItem: boolean }) =>
      getOptionFromItem ? "border-gray-800" : ""}`,
  };
})<{ getOptionFromItem: boolean }>`
  ${tw`flex border items-center`}
`;

const OptionName = styled.p`
  ${tw`mr-2`}
`;

const OptionExtra = styled.p`
  ${tw`text-sm opacity-75`}
`;

interface IDishOptionProps {
  isSelected: boolean;
  name: string;
  extra?: number | null;
  dishId: number;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

const DishOption: React.FC<IDishOptionProps> = ({
  isSelected,
  name,
  extra,
  addOptionToItem,
  removeOptionFromItem,
  dishId,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };
  return (
    <Option onClick={onClick} getOptionFromItem={isSelected}>
      <OptionName>{name}</OptionName>
      {extra && <OptionExtra>(extra)</OptionExtra>}
    </Option>
  );
};

export default DishOption;
