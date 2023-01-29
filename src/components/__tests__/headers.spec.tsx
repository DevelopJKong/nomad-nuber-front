import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { ME_QUERY } from "../../hooks/useMe";
import Header from "../header";

describe("<Header />", () => {
   it("renders verify banner", async () => {
      await waitFor(async () => {
         const { getByText } = render(
            <MockedProvider
               mocks={[
                  {
                     request: {
                        query: ME_QUERY,
                     },
                     result: {
                        data: {
                           me: {
                              id: 1,
                              email: "test@email.com",
                              role: "Client",
                              verified: false,
                           },
                        },
                     },
                  },
               ]}
            >
               <Router>
                  <Header />
               </Router>
            </MockedProvider>,
         );
         await new Promise((resolve) => setTimeout(resolve, 0));
         getByText("Please verify your email.");
      });
   });

   it("renders without verify banner", async () => {
      render(
         <MockedProvider
            mocks={[
               {
                  request: {
                     query: ME_QUERY,
                  },
                  result: {
                     data: {
                        me: {
                           id: 1,
                           email: "test@email.com",
                           role: "Client",
                           verified: true,
                        },
                     },
                  },
               },
            ]}
         >
            <Router>
               <Header />
            </Router>
         </MockedProvider>,
      );
      await waitFor(async () => {
         await new Promise((resolve) => setTimeout(resolve, 0));
         expect(screen.queryByText("Please verify your email.")).toBeNull();
      });
   });
});
