import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { View } from "../../components/View/View";

afterEach(cleanup);

const ViewTest = ({ children }: any) => {
  return <View title="div">{children}</View>;
};

it("Div render test", () => {
  render(<ViewTest />);
  expect(screen.getByTitle(/div/i)).toBeTruthy();
});
