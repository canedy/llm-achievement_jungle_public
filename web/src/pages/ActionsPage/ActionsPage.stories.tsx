import type { Meta, StoryObj } from "@storybook/react";

import ActionsPage from "./ActionsPage";

const meta: Meta<typeof ActionsPage> = {
  component: ActionsPage,
};

export default meta;

type Story = StoryObj<typeof ActionsPage>;

export const Primary: Story = {};
