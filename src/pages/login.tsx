import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import Helmet from 'react-helmet';
import { FormError } from '../components/form-error';
import { gql, useMutation } from '@apollo/client';
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';

// !  https://velog.io/@jinsunkimdev/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-tailwindcss-styled-components-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
// !  https://itchallenger.tistory.com/569 ⭐⭐⭐⭐⭐⭐⭐⭐
// !  https://www.npmjs.com/package/twin.macro
// !  https://eslint.org/docs/latest/rules/quotes

const Container = styled.div`
  ${tw`h-screen flex items-center flex-col mt-10 lg:mt-28`}
`;

const Content = styled.div`
  ${tw`bg-white w-full max-w-lg pt-8 pb-7 rounded-lg text-center`}
`;

const Screen = styled.div`
  ${tw`w-full max-w-screen-md flex flex-col px-5 items-center`}
`;

const Title = styled.h4`
  ${tw`w-full font-medium text-left text-2xl mb-5 mt-5`}
`;

const Img = styled.img`
  ${tw`w-52 mb-1`}
`;

const Form = styled.form`
  ${tw`grid gap-3 mt-5 w-full mb-5`}
`;

const Input = styled.input`
  ${tw`focus:outline-none focus:border-gray-500 p-3 border-2 text-lg border-gray-200 transition-colors`}
`;

const RegisterLink = styled(Link)`
  ${tw`text-lime-600 hover:underline`}
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
    clearErrors,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok) {
      console.log(token);
    } else {
      console.log(error);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onValid = (data: ILoginForm) => {
    if (!loading) {
      const { email, password } = data;
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <Content>
        <Screen>
          <Img src='https://www.ubereats.com/_static/8b969d35d373b512664b78f912f19abc.svg' />
          <Title>Welcome back</Title>
          <Form onSubmit={handleSubmit(onValid)} onClick={() => clearErrors()}>
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
            <Button canClick={isValid} loading={loading} actionText={'Log in'} />
            {loginMutationResult?.login.error && (
              <FormError errorMessage={loginMutationResult.login.error} />
            )}
          </Form>
        </Screen>
        <div>
          New to Nuber? <RegisterLink to='/create-account'>Create an Account</RegisterLink>
        </div>
      </Content>
    </Container>
  );
};

export default Login;
