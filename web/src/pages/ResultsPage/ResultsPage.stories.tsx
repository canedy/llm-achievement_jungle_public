import type { Meta, StoryObj } from "@storybook/react";

import KeyResultsPage from "./ResultsPage";

const meta: Meta<typeof KeyResultsPage> = {
  component: KeyResultsPage,
};

export default meta;

type Story = StoryObj<typeof KeyResultsPage>;

export const Primary: Story = {};
