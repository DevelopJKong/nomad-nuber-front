import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { verifyEmail, verifyEmailVariables } from "../../__generated__/verifyEmail";

const Container = styled.div`
  ${tw`mt-52 flex flex-col items-center justify-center`}
`;

const Confirm = styled.h2`
  ${tw`text-lg mb-2 font-medium`}
`;

const Text = styled.h4`
  ${tw`text-gray-700 text-sm`}
`;

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

const ConfirmEmail = () => {
  const [verifyEmail, { loading: verifyingEmail }] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
  );

  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);
  return (
    <Container>
      <Confirm>confirm-email</Confirm>
      <Text>Please wait, dont close this page...</Text>
    </Container>
  );
};

export default ConfirmEmail;
