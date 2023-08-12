import {ModernDialogComponent} from "./modern-dialog.component"
import type { Meta, StoryObj } from '@storybook/angular';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ModernDialogComponent> = {
  title: 'Components/Modern Dialog',
  component: ModernDialogComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ModernDialogComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Default: Story = {
  args: {
  },
  render: (args: ModernDialogComponent) => ({
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
export const CloseWithButton: Story = {
  args: {
  },
  render: (args: ModernDialogComponent) => ({
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
export const OpenWithButton: Story = {
  args: {
  },
  render: (args: ModernDialogComponent) => ({
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

export const DialogUpdates: Story = {
  args: {
  },
  render: (args: ModernDialogComponent) => ({
    props: {
      ...args,
      isOpen: true,
      updateDialog: false,
    },
    template: `
      <button #button (click)="isOpen = !isOpen" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Toggle
      Dialog
    </button>
      <app-dialog *ngIf="isOpen" [previousFocusElement]="button" (onClose)="isOpen = false">
        <div header *ngIf="!updateDialog">Some content</div>
        <div body *ngIf="!updateDialog">
          <p>Some more content</p>
          <button (click)="updateDialog = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Activate changes</button>
        </div>

        <div header *ngIf="updateDialog">Secondary Content Updated</div>
        <div body *ngIf="updateDialog">
          <p>Updated content</p>
          <button (click)="updateDialog = false" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Revert Changes</button>
        </div>
      </app-dialog>
    `,
  }),
};
