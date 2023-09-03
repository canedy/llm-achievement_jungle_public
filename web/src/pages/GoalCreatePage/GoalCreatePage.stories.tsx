import type { Meta, StoryObj } from "@storybook/react";

import GoalCreatePage from "./GoalCreatePage";

const meta: Meta<typeof GoalCreatePage> = {
  component: GoalCreatePage,
};

export default meta;

type Story = StoryObj<typeof GoalCreatePage>;

export const Primary: Story = {};
