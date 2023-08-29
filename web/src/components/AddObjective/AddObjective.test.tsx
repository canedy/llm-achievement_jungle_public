import { render } from "@redwoodjs/testing/web";

import AddObjective from "./AddObjective";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("AddObjective", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<AddObjective />);
    }).not.toThrow();
  });
});
