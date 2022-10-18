import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useMe } from "../../hooks/useMe";

const Container = styled.div`
  ${tw`mt-52 flex flex-col justify-center items-center`}
`;

const Title = styled.h4`
  ${tw`font-semibold text-2xl mb-3`}
`;

const Form = styled.form`
  ${tw`grid max-w-screen-sm gap-3 mt-5 w-full mb-5`}
`;

const Input = styled.input`
  ${tw`focus:outline-none focus:border-gray-500 p-3 border-2 text-lg border-gray-200 transition-colors`}
`;

const EditProfile = () => {
  const { data: userData } = useMe();
  return (
    <Container>
      <Title>Edit Profile</Title>
      <Form>
        <Input type='email' placeholder='Email' />
        <Input type='password' placeholder='Password' />
        <Button loading={false} canClick={true} actionText={"Save Profile"} />
      </Form>
    </Container>
  );
};

export default EditProfile;
