import { render } from "@redwoodjs/testing/web";

import FocusAreaPage from "./FocusAreaPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("FocusAreaPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<FocusAreaPage />);
    }).not.toThrow();
  });
});
