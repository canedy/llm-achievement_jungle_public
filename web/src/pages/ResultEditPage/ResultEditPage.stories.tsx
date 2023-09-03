import type { Meta, StoryObj } from "@storybook/react";

import ResultEditPage from "./ResultEditPage";

const meta: Meta<typeof ResultEditPage> = {
  component: ResultEditPage,
};

export default meta;

type Story = StoryObj<typeof ResultEditPage>;

export const Primary: Story = {};
