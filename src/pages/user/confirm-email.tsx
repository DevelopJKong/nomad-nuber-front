import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { useMe } from "../../hooks/useMe";
import { VerifyEmailInput, VerifyEmailOutput } from "../../generated/graphql";

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
   const { data: userData, refetch } = useMe();
   // const client = useApolloClient();
   const history = useHistory();
   const onCompleted = async (data: { verifyEmail: VerifyEmailOutput }) => {
      const {
         verifyEmail: { ok },
      } = data;
      if (ok && userData?.me.id) {
         await refetch();
         // client.writeFragment({
         //   id: `User:${userData?.me.id}`,
         //   fragment: gql`
         //     fragment VerifiedUser on User {
         //       verified
         //     }
         //   `,
         //   data: {
         //     verified: true,
         //   },
         // });
         history.push("/");
      }
   };

   const [verifyEmail, { loading: _ }] = useMutation<{ verifyEmail: VerifyEmailOutput }, { input: VerifyEmailInput }>(
      VERIFY_EMAIL_MUTATION,
      {
         onCompleted,
      },
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
   }, [verifyEmail]);
   return (
      <Container>
         <Helmet>
            <title>Verify Email | Nuber Eats</title>
         </Helmet>
         <Confirm>confirm-email</Confirm>
         <Text>Please wait, don&apos;t close this page...</Text>
      </Container>
   );
};

export default ConfirmEmail;
