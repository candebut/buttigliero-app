import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "../components";
import { TableElement } from "../components/Table/Table";
import { ReactElement } from "react";
// import { TableModel } from '../components/Table/Table';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Table",
  component: Table,
  // tags: ['autodocs'],
  parameters: {
    elements: [],
    model: [],
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type MyElement = ReactElement<any, any>;

// const elements: MyElement[] = [
//     { firstName: 'A', lastName: 'A', age: 10 },
//     { firstName: 'B', lastName: 'B', age: 11 },
//     { firstName: 'C', lastName: 'C', age: 12 },
//     { firstName: 'D', lastName: 'D', age: 13 },
//     { firstName: 'E', lastName: 'E', age: 14 },
// ];

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const GeneralTable: Story = {
  args: {
    elements: [{ name: "Candela", lastName: "Buttigliero", age: "29" }],
    model: {
      columns: [
        // {
        //   title: 'Name',
        // },
      ],
    },
  },
};
