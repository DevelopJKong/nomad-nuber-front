import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { LOGO } from "../constants";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedInVar } from "../apollo";

const Container = styled.header`
  ${tw`py-4`}
`;

const Content = styled.div`
  ${tw`w-full px-5 xl:px-5 max-w-screen-2xl mx-auto flex justify-between items-center`}
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

const Verify = styled.div`
  ${tw`bg-red-500 p-3 px-3 text-center text-sm text-white`}
`;

const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <Verify>
          <span>Please verify your email.</span>
        </Verify>
      )}
      <Container>
        <Content>
          <Img src={LOGO} alt='Nuber Eats' />
          <Text>
            <Link to='/my-profile'>
              <Person icon={faUser} />
            </Link>
            <Text onClick={() => isLoggedInVar(false)}>Log out &rarr;</Text>
          </Text>
        </Content>
      </Container>
    </>
  );
};

export default Header;
