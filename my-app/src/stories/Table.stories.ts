import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "../components";

const meta = {
  title: "Table",
  component: Table,
  parameters: {
    elements: [],
    model: [],
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GeneralTable: Story = {
  args: {
    elements: [{ name: "Candela", lastName: "Buttigliero", age: "29" }],
    model: {
      columns: [
        // {
        // Issues creating the case of use for the html property. Will keep on investigating.
        // },
      ],
    },
  },
};
