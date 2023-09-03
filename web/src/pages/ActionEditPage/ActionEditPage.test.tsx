import { render } from "@redwoodjs/testing/web";

import ActionEditPage from "./ActionEditPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("ActionEditPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<ActionEditPage />);
    }).not.toThrow();
  });
});
