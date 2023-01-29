import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import tw from "twin.macro";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import { editProfile, editProfileVariables } from "../../__generated__/editProfile";

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

const Error = styled.div`
   color: red;
`;

interface IFormProps {
   email?: string;
   password?: string;
}

const EDIT_PROFILE_MUTATION = gql`
   mutation editProfile($input: EditProfileInput!) {
      editProfile(input: $input) {
         ok
         error
      }
   }
`;

const EditProfile = () => {
   const { data: userData, refetch: refetchUser } = useMe();
   // const client = useApolloClient();
   const onCompleted = async (data: editProfile) => {
      const {
         editProfile: { ok },
      } = data;
      if (ok && userData) {
         await refetchUser();
         // TODO writeFragmet 제대로 이해하기 editProfile
         // client.writeFragment({
         //   id: `User:${id}`,
         //   fragment: gql`
         //     fragment EditedUser on User {
         //       verified
         //       email
         //     }
         //   `,
         //   data: {
         //     email: newEmail,
         //     verified: false,
         //   },
         // });
      }
   };
   const [editProfile, { loading }] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MUTATION, { onCompleted });
   const {
      register,
      handleSubmit,
      clearErrors,
      formState: { errors },
   } = useForm<IFormProps>({
      mode: "onChange",
      defaultValues: {
         email: userData?.me.email,
      },
   });

   const onValid = async (data: IFormProps) => {
      const { email, password } = data;
      editProfile({
         variables: {
            input: {
               email,
               ...(password !== "" && { password }),
            },
         },
      });
   };

   return (
      <Container>
         <Title>Edit Profile</Title>
         <Form onClick={() => clearErrors()} onSubmit={handleSubmit(onValid)}>
            <Input {...register("email")} type='email' placeholder='Email' />
            <Error>{errors?.email?.message}</Error>
            <Input
               {...register("password", {
                  pattern:
                     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
               })}
               type='password'
               placeholder='Password'
            />
            <Error>{errors?.email?.message}</Error>
            <Button loading={loading} canClick={!loading} actionText={"Save Profile"} />
         </Form>
      </Container>
   );
};

export default EditProfile;
