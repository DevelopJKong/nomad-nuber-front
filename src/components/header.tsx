import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
const Container = styled.header`
  ${tw`py-4`}
`;

const Content = styled.div`
  ${tw`w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center`}
`;

const Img = styled.img`
  ${tw`w-24`}
`;

const Text = styled.span`
  ${tw`text-xs`}
`;

const Header = () => {
  return (
    <Container>
      <Content>
        <Img
          src='https://www.ubereats.com/_static/8b969d35d373b512664b78f912f19abc.svg'
          alt='Nuber Eats'
        />
        <Text>
          <Link to='/my-profile'>Profile</Link>
        </Text>
      </Content>
    </Container>
  );
};

export default Header;
