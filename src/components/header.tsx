import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { LOGO } from '../constants';
import { useMe } from '../hooks/useMe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const Person = styled(FontAwesomeIcon)`
  ${tw`text-xl`}
`;

const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <Container>
      <Content>
        <Img src={LOGO} alt='Nuber Eats' />
        <Text>
          <Link to='/my-profile'>
            <Person icon={faUser} />
          </Link>
        </Text>
      </Content>
    </Container>
  );
};

export default Header;
