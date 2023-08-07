# How to render more extra dependencies components in storybook?

with 
```ts
decorators: [
moduleMetadata({
declarations: [component1, ...],
imports: [CommonModule]
})
],
```

## wider view

```ts
const meta: Meta<DialogButtonComponent> = {
title: 'Components/Dialog-Button',
component: DialogButtonComponent,
decorators: [
moduleMetadata({
declarations: [DialogButtonComponent, DialogComponent, ButtonComponent],
imports: [CommonModule]
})
],
tags: ['autodocs'],
render: (args: DialogButtonComponent) => ({
props: {
...args,
},
template: `
<app-dialog-button [isOpen]="isOpen"></app-dialog-button>
`,
}),
};
```
