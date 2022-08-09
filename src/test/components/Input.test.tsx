import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Input } from "../../components/Input/Input";

afterEach(cleanup);

const InputTest = ({ handleChange }: any) => {
  return (
    <Input
      title="input"
      name="login"
      type="text"
      label="Login: "
      placeholder="Digite o login"
      onChange={handleChange}
    />
  );
};

it("Input render test", () => {
  render(<InputTest />);
  expect(screen.getByTitle(/input/i)).toBeTruthy();
});

test("Change value input", () => {
  const handleChange = jest.fn();
  render(<InputTest handleChange={handleChange} />);
  fireEvent.change(screen.getByTitle(/input/i), {
    target: { value: "user" },
  });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
