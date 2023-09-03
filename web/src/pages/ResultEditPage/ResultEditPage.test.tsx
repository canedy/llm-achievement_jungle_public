import { render } from "@redwoodjs/testing/web";

import ResultEditPage from "./ResultEditPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("ResultEditPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<ResultEditPage />);
    }).not.toThrow();
  });
});
