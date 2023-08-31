import type { Meta, StoryObj } from "@storybook/react";

import ChatConversationPage from "./GoalsPage";

const meta: Meta<typeof ChatConversationPage> = {
  component: ChatConversationPage,
};

export default meta;

type Story = StoryObj<typeof ChatConversationPage>;

export const Primary: Story = {};
