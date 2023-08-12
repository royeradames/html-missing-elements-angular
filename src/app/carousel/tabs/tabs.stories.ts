import type { Meta, StoryObj } from '@storybook/angular';
import {TabsComponent} from "./tabs.component";

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<TabsComponent> = {
  title: 'Components/Dialog',
  component: TabsComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TabsComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Default: Story = {
  args: {
  },
  render: (args: TabsComponent) => ({
    props: {
      ...args,
    },
    template: `
      <app-tabs></app-tabs>
    `,
  }),
};
