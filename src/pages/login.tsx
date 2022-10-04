import styled from 'styled-components';
import tw from 'twin.macro';
const Container = styled.div.attrs({
  className: `h-screen flex items-center justify-center bg-gray-800`,
})``;

const Content = styled.div.attrs({
  className: `bg-white w-full max-w-lg py-10 rounded-lg text-center`,
})`
  & h3 {
    // Title
    ${tw`text-2xl text-gray-800`}
  }
`;

const Form = styled.form.attrs({
  className: `flex flex-col mt-5 px-5`,
})``;

const Input = styled.form.attrs({
  className: `bg-gray-100 shadow-inner border-2 focus:border-opacity-60 focus:border-green-600 focus:outline-none mb-3 py-3 px-5 rounded-lg`,
})``;

const Button = styled.button.attrs({
  className: `py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90`,
})``;

const Login = () => {
  return (
    <Container>
      <Content>
        <h3>Log In</h3>
        <Form>
          <Input placeholder='Email' />
          <Input placeholder='Password' />
          <Button>Log In</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
