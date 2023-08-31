import { render } from "@redwoodjs/testing/web";

import KeyResultsPage from "./ResultsPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("KeyResultsPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<KeyResultsPage />);
    }).not.toThrow();
  });
});
