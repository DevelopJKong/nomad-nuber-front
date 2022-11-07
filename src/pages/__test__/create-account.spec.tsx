import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import CreateAccount from "../create-account";
import { HelmetProvider } from "react-helmet-async";

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
});
