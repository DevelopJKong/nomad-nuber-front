import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

const LoggedInRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("you can't make the account");
  };
  return (
    <div>
      <h1>Logged out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            type="email"
            placeholder="email"
            {...register("email", {
              required: true,
              // validate: (email:string) => email.includes("@gmail.com"),
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com/,
            })}
          />
        </div>
        <div>{errors.email?.message}</div>
        <div>
          <input
            type="password"
            placeholder="password"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <div>{errors.password?.message}</div>
      </form>
      <button className={"bg-yellow-300 text-white"}>Submit</button>
    </div>
  );
};

export default LoggedInRouter;
