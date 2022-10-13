import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm } from 'react-hook-form';
import Helmet from 'react-helmet';
import { FormError } from '../components/form-error';
import { gql, useMutation } from '@apollo/client';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { UserRole } from '../__generated__/globalTypes';

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

const SelectBox = styled.select`
  ${tw`border-gray-200 p-3 border-2`}
`;

// const Error = styled.div`
//   ${tw`font-medium text-red-500`}
// `;

const CREACT_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAcccountInput: CreateAccountInput!) {
    createAccount(input: $createAcccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

const CreactAccount = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const [createAccountMutation] = useMutation(CREACT_ACCOUNT_MUTATION);
  const onValid = () => {};

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
            <SelectBox
              {...register('role', {
                required: true,
              })}
            >
              {Object.keys(UserRole).map((role, index) => (
                <option key={index}>{role}</option>
              ))}
            </SelectBox>
            <Button canClick={isValid} loading={false} actionText={'Create Account'} />
          </Form>
        </Screen>
        <div>
          New to Nuber? <RegisterLink to='/create-account'>Create an Account</RegisterLink>
        </div>
      </Content>
    </Container>
  );
};

export default CreactAccount;
