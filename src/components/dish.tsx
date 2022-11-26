import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

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

interface IDishProps {
  description: string;
  name: string;
  price: number;
}

const Dish: React.FC<IDishProps> = ({ description, name, price }) => {
  return (
    <Container>
      <Content>
        <Name>{name}</Name>
        <Description>{description}</Description>
        <Price>{price}</Price>
      </Content>
    </Container>
  );
};

export default Dish;
