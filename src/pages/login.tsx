import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { gql, useMutation } from '@apollo/client';
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation';

// !  https://velog.io/@jinsunkimdev/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-tailwindcss-styled-components-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
// !  https://itchallenger.tistory.com/569 ⭐⭐⭐⭐⭐⭐⭐⭐
// !  https://www.npmjs.com/package/twin.macro
// !  https://eslint.org/docs/latest/rules/quotes

const Container = styled.div`
  ${tw`h-screen flex items-center justify-center bg-gray-800`}
`;

const Content = styled.div`
  ${tw`bg-white w-full max-w-lg pt-8 pb-7  rounded-lg text-center`}
`;

const Title = styled.h3`
  ${tw`text-2xl text-gray-800`}
`;

const Form = styled.form`
  ${tw`grid gap-3 mt-5 px-5`}
`;

const Input = styled.input`
  ${tw`bg-gray-100 shadow-inner focus:ring-2 focus:ring-green-600 focus:ring-opacity-90 focus:outline-none mb-3 py-3 px-5 rounded-lg`}
`;

const Button = styled.button`
  ${tw`py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90`}
`;

// const Error = styled.div`
//   ${tw`font-medium text-red-500`}
// `;

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginForm>();

  const [loginMutation, { data }] = useMutation<loginMutation, loginMutationVariables>(
    LOGIN_MUTATION,
    {
      variables: {
        loginInput: {
          email: watch('email'),
          password: watch('password'),
        },
      },
    },
  );

  const onValid = () => {
    loginMutation();
  };

  return (
    <Container>
      <Content>
        <Title>Log In</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            placeholder='Email'
            type='email'
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
            })}
          />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          <Input
            placeholder='Password'
            type='password'
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: 10,
            })}
          />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage={'Password must be more than 10 chars'} />
          )}
          <Button>Log In</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
