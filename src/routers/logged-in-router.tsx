import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import tw from 'twin.macro';
import { isLoggedInVar } from '../apollo';
import { meQuery } from '../__generated__/meQuery';

const Loading = styled.div`
  ${tw`h-screen flex justify-center items-center`}
`;

const LoadingText = styled.span`
  ${tw`font-medium text-xl tracking-wide`}
`;

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

const Login = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  console.log(data, error);
  if (!data || loading || error) {
    return (
      <Loading>
        <LoadingText>Loading...</LoadingText>
      </Loading>
    );
  }
  return (
    <div>
      <h1>{data.me.role}</h1>
    </div>
  );
};

export default Login;
