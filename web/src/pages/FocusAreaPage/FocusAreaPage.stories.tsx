import type { Meta, StoryObj } from "@storybook/react";

import FocusAreaPage from "./FocusAreaPage";

const meta: Meta<typeof FocusAreaPage> = {
  component: FocusAreaPage,
};

export default meta;

type Story = StoryObj<typeof FocusAreaPage>;

export const Primary: Story = {};
