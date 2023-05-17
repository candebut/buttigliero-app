import type { Meta, StoryObj } from "@storybook/react";

import { Loader } from "../components";

const meta = {
  title: "Loader",
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GeneralLoader: Story = {
  args: {
    children: "Loading",
  },
};
