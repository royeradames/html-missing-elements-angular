import {moduleMetadata} from '@storybook/angular';
import {DialogComponent} from "./dialog.component"

export default {
  title: 'Components/MyComponent', decorators: [moduleMetadata({
    declarations: [DialogComponent],
  }),],
};

export const Default = () => ({
  component: DialogComponent, props: {},
});
