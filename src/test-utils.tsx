import React from "react";

const Test = () => {
   return <div>Test</div>;
};

export default Test;

// import React from "react";
// import { render } from "@testing-library/react";
// import { HelmetProvider } from "react-helmet-async";
// import { BrowserRouter as Router } from "react-router-dom";
//
// type Props = {
//   children: React.ReactNode;
// };
// const AllTheProviders: React.FC<Props> = ({ children }) => {
//   return (
//     <HelmetProvider>
//       <Router>{children}</Router>
//     </HelmetProvider>
//   );
// };
//
// const customRender = (ui: React.ReactElement, options?: any) =>
//   render(ui, { wrapper: AllTheProviders, ...options });
//
// // re-export everything
// export * from "@testing-library/react";
//
// // override render method
// export { customRender as render };
