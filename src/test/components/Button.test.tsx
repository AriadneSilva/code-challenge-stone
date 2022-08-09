import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../../components/Button/Button";

afterEach(cleanup);

const ButtonTest = ({ handleClick, children }: any) => {
  return (
    <Button title="button" onClick={handleClick}>
      {children}
    </Button>
  );
};

it("Button render test", () => {
  render(<ButtonTest />);
  expect(screen.getByTitle(/button/i)).toBeTruthy();
});

test("Click button", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Botao Teste</Button>);
  fireEvent.click(screen.getByText(/Botao Teste/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
