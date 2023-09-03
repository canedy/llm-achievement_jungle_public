import type { Meta, StoryObj } from "@storybook/react";

import ActionEditPage from "./ActionEditPage";

const meta: Meta<typeof ActionEditPage> = {
  component: ActionEditPage,
};

export default meta;

type Story = StoryObj<typeof ActionEditPage>;

export const Primary: Story = {};
