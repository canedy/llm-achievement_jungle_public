import type { Meta, StoryObj } from "@storybook/react";

import ActionCreatePage from "./ActionCreatePage";

const meta: Meta<typeof ActionCreatePage> = {
  component: ActionCreatePage,
};

export default meta;

type Story = StoryObj<typeof ActionCreatePage>;

export const Primary: Story = {};
