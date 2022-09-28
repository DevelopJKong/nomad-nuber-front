import React from "react";
import { isLoggedInVar } from "../apollo";

const LoggedInRouter = () => {
  return (
    <div>
      <h1>LoggedInRouter</h1>
      <button onClick={() => isLoggedInVar(false)}>Log out</button>
    </div>
  );
};

export default LoggedInRouter;
