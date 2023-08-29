import { render } from "@redwoodjs/testing/web";

import ActionsPage from "./ActionsPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("ActionsPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<ActionsPage />);
    }).not.toThrow();
  });
});
