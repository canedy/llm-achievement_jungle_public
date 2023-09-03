import { render } from "@redwoodjs/testing/web";

import GoalCreatePage from "./GoalCreatePage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("GoalCreatePage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<GoalCreatePage />);
    }).not.toThrow();
  });
});
