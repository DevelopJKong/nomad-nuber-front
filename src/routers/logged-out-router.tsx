import React from "react";
import { isLoggedInVar } from "../apollo";

const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true);
  };
  return (
    <div>
      <h1>logged-out-router</h1>
      <button onClick={onClick}>Click to login</button>
    </div>
  );
};

export default LoggedOutRouter;
