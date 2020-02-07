import '@testing-library/jest-dom/extend-expect'
import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "./App";


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
})



it("renders register button", () => {
  const { getByText } = render(<App />);
  expect(getByText("Register")).toBeInTheDocument();
})