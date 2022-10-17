import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
const Container = styled.div`
  ${tw`h-screen flex flex-col items-center justify-center`}
`;

const Title = styled.h2`
  ${tw`font-semibold text-2xl mb-3`}
`;

const SubTitle = styled.h4`
  ${tw`font-medium text-base mb-5`}
`;

const GoHome = styled(Link)`
  ${tw`hover:underline text-lime-600`}
`;

const NotFound = () => {
  return (
    <Container>
      <Title>Page Not Found.</Title>
      <SubTitle>The page you are looking for </SubTitle>
      <GoHome to='/'>Go back home &rarr;</GoHome>
    </Container>
  );
};

export default NotFound;
