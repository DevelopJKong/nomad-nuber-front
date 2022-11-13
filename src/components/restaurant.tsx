import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

const RestaurantBox = styled.div`
  ${tw`flex flex-col`}
`;

const RestaurantImg = styled.div`
  ${tw`py-28 bg-cover bg-center`}
`;

const RestaurantTitle = styled.h3`
  ${tw`text-lg font-medium`}
`;

const RestaurantContent = styled.span`
  ${tw`border-t mt-3 py-2 text-xs opacity-50 border-gray-200`}
`;
const Restaurant: React.FC<IRestaurantProps> = ({ id, coverImg, name, categoryName }) => {
  return (
    <Link to={`/restaurants/${id}`}>
      <RestaurantBox>
        <img src='' />
        <RestaurantImg style={{ backgroundImage: `url(${coverImg})` }}></RestaurantImg>
        <RestaurantTitle>{name}</RestaurantTitle>
        <RestaurantContent>{categoryName}</RestaurantContent>
      </RestaurantBox>
    </Link>
  );
};

export default Restaurant;
