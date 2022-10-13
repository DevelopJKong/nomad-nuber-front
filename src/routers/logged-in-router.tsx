import { isLoggedInVar } from '../apollo';

const Login = () => {
  return (
    <div>
      <h1>Logged In</h1>
      <button onClick={() => isLoggedInVar(false)}>Log out</button>
    </div>
  );
};

export default Login;
