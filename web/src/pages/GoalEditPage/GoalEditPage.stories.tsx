import type { Meta, StoryObj } from "@storybook/react";

import GoalEditPage from "./GoalEditPage";

const meta: Meta<typeof GoalEditPage> = {
  component: GoalEditPage,
};

export default meta;

type Story = StoryObj<typeof GoalEditPage>;

export const Primary: Story = {};
