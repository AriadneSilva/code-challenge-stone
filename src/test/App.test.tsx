import { render } from "@testing-library/react";
import { App } from "../App";
import { BrowserRouter as Router } from "react-router-dom";

test("Render APP", async () => {
  render(
    <Router>
      <App />
    </Router>
  );
});
