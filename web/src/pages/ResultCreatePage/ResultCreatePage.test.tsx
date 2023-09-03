import { render } from "@redwoodjs/testing/web";

import ResultCreatePage from "./ResultCreatePage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("ResultCreatePage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<ResultCreatePage />);
    }).not.toThrow();
  });
});
