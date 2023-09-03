import type { Meta, StoryObj } from "@storybook/react";

import ResultCreatePage from "./ResultCreatePage";

const meta: Meta<typeof ResultCreatePage> = {
  component: ResultCreatePage,
};

export default meta;

type Story = StoryObj<typeof ResultCreatePage>;

export const Primary: Story = {};
