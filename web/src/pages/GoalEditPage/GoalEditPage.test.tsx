import { render } from "@redwoodjs/testing/web";

import GoalEditPage from "./GoalEditPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("GoalEditPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<GoalEditPage />);
    }).not.toThrow();
  });
});
