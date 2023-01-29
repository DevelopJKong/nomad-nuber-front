import React from "react";
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, waitFor, screen, fireEvent, getByRole, RenderResult } from "@testing-library/react";
import Login, { LOGIN_MUTATION } from "../login";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
describe("<Login />", () => {
   let mockedClient: MockApolloClient;
   let renderResult: RenderResult;
   beforeEach(async () => {
      await waitFor(() => {
         mockedClient = createMockClient();
         renderResult = render(
            <HelmetProvider>
               <Router>
                  <ApolloProvider client={mockedClient}>
                     <Login />
                  </ApolloProvider>
               </Router>
            </HelmetProvider>,
         );
      });
   });
   it("should render OK", async () => {
      await waitFor(() => {
         expect(document.title).toBe("Login | Nuber Eats");
      });
   });

   it("displays email validation errors when we type something", async () => {
      fireEvent.input(screen.getByRole("email"), {
         target: {
            value: "email",
         },
      });

      expect(await screen.findAllByRole("alert")).toHaveLength(1);
   });

   it("displays email validation errors when we type nothing", async () => {
      fireEvent.input(screen.getByRole("email"), {
         target: {
            value: "email",
         },
      });

      fireEvent.change(screen.getByRole("email"), {
         target: {
            value: "",
         },
      });

      expect(await screen.findByRole("alert")).toHaveTextContent(/email is required/i);
   });

   it("display password required errors", async () => {
      const email = screen.getByRole("email");
      const submitBtn = screen.getByRole("button");

      // ! 아래 처럼도 사용 가능
      // const user = userEvent.setup();
      // await user.type(email,"test@naver.com");
      // await user.click(submitBtn);
      fireEvent.input(email, {
         target: {
            value: "test@naver.com",
         },
      });

      fireEvent.submit(submitBtn);

      expect(await screen.findByRole("alert")).toHaveTextContent(/password is required/i);
   });

   it("submits form and calls mutation", async () => {
      const email = screen.getByRole("email");
      const password = screen.getByRole("password");
      const submitBtn = screen.getByRole("button");
      const user = userEvent.setup();
      const formData = {
         email: "real@test.com",
         password: "123",
      };
      const mockedMutationResponse = jest.fn().mockResolvedValue({
         data: {
            login: {
               ok: true,
               token: "XXX",
               error: null,
            },
         },
      });
      mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

      await user.type(email, formData.email);
      await user.type(password, formData.password);
      await user.click(submitBtn);

      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedMutationResponse).toHaveBeenCalledWith({
         loginInput: {
            email: formData.email,
            password: formData.password,
         },
      });
   });

   it("submits form and calls mutation-error", async () => {
      const email = screen.getByRole("email");
      const password = screen.getByRole("password");
      const submitBtn = screen.getByRole("button");
      const user = userEvent.setup();
      const formData = {
         email: "real@test.com",
         password: "123",
      };
      const mockedMutationResponse = jest.fn().mockResolvedValue({
         data: {
            login: {
               ok: true,
               token: "XXX",
               error: "mutation-error",
            },
         },
      });
      mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
      jest.spyOn(Storage.prototype, "setItem");

      await user.type(email, formData.email);
      await user.type(password, formData.password);
      await user.click(submitBtn);
      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedMutationResponse).toHaveBeenCalledWith({
         loginInput: {
            email: formData.email,
            password: formData.password,
         },
      });

      expect(await screen.findByRole("alert")).toHaveTextContent("mutation-error");
      expect(localStorage.setItem).toHaveBeenCalledWith("nuber-token", "XXX");
   });
});
