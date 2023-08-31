import { render } from "@redwoodjs/testing/web";

import ChatConversationPage from "./GoalsPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("ChatConversationPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<ChatConversationPage />);
    }).not.toThrow();
  });
});
