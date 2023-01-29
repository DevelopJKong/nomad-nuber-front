import React from "react";
import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { BrowserRouter as Router } from "react-router-dom";
import CreateAccount, { CREATE_ACCOUNT_MUTATION } from "../create-account";
import { HelmetProvider } from "react-helmet-async";
import userEvent from "@testing-library/user-event";
import { UserRole } from "../../__generated__/globalTypes";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
   const realModule = jest.requireActual("react-router-dom");
   return {
      ...realModule,
      useHistory: () => {
         return {
            push: mockPush,
         };
      },
   };
});

describe("<CreateAccount />", () => {
   let mockedClient: MockApolloClient;
   let renderResult: RenderResult;
   beforeEach(async () => {
      await waitFor(() => {
         mockedClient = createMockClient();
         renderResult = render(
            <HelmetProvider>
               <Router>
                  <ApolloProvider client={mockedClient}>
                     <CreateAccount />
                  </ApolloProvider>
               </Router>
            </HelmetProvider>,
         );
      });
   });

   it("renders OK", async () => {
      await waitFor(() => {
         return expect(document.title).toBe("Create Account | Nuber Eats");
      });
   });

   it("renders validation errors", async () => {
      const email = screen.getByPlaceholderText(/email/i);
      const button = screen.getByRole("button");
      const user = userEvent.setup();

      await user.type(email, "wont@work");
      expect(await screen.findByRole("alert")).toHaveTextContent(/please enter a valid email/i);

      await user.clear(email);

      await user.type(email, "test@naver.com");
      await user.click(button);
      expect(await screen.findByRole("alert")).toHaveTextContent(/password is required/i);
   });

   it("submits form and calls mutation", async () => {
      const email = screen.getByRole("email");
      const password = screen.getByRole("password");
      const submitBtn = screen.getByRole("button");
      const user = userEvent.setup();
      const formData = {
         email: "working@mail.com",
         password: "Aasdasd123!@2",
         role: UserRole.Client,
      };
      const mockedMutationResponse = jest.fn().mockResolvedValue({
         data: {
            createAccount: {
               ok: true,
               error: "mutation-error",
            },
         },
      });
      mockedClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedMutationResponse);
      jest.spyOn(window, "alert").mockImplementation(() => null);
      await user.type(email, formData.email);
      await user.type(password, formData.password);
      await user.click(submitBtn);

      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedMutationResponse).toHaveBeenCalledWith({
         createAccountInput: {
            email: formData.email,
            password: formData.password,
            role: formData.role,
         },
      });
      expect(window.alert).toHaveBeenCalledWith("Account Created Log in now!");
      expect(mockPush).toHaveBeenCalledWith("/");
      expect(await screen.findByRole("alert")).toHaveTextContent("mutation-error");
   });
   afterAll(() => {
      jest.clearAllMocks();
   });
});
