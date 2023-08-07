import {DialogComponent} from "./dialog.component"
import type { Meta, StoryObj } from '@storybook/angular';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<DialogComponent> = {
  title: 'Components/Dialog',
  component: DialogComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DialogComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Default: Story = {
  args: {
  },
  render: (args: DialogComponent) => ({
    props: {
      ...args,
      isOpen: true,
    },
    template: `
      <app-dialog *ngIf="isOpen" (onClose)="isOpen = false">
        <div header>Some content</div>
        <div body>
          <p>Some more content</p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button that clicks</button>
        </div>
      </app-dialog>
    `,
  }),
};
export const DialogButtonClose: Story = {
  args: {
  },
  render: (args: DialogComponent) => ({
    props: {
      ...args,
      isOpen: false,
    },
    template: `
      <button #button (click)="isOpen = !isOpen" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Toggle
      Dialog
    </button>
      <app-dialog *ngIf="isOpen" [previousFocusElement]="button" (onClose)="isOpen = false">
        <div header>Some content</div>
        <div body>
          <p>Some more content</p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button that clicks</button>
        </div>
      </app-dialog>
    `,
  }),
};
export const DialogButtonOpen: Story = {
  args: {
  },
  render: (args: DialogComponent) => ({
    props: {
      ...args,
      isOpen: true,
    },
    template: `
      <button #button (click)="isOpen = !isOpen" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Toggle
      Dialog
    </button>
      <app-dialog *ngIf="isOpen" [previousFocusElement]="button" (onClose)="isOpen = false">
        <div header>Some content</div>
        <div body>
          <p>Some more content</p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button that clicks</button>
        </div>
      </app-dialog>
    `,
  }),
};
