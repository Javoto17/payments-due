import { Meta } from '@storybook/react';

import Button from './Button';

export default {
  title: 'Button',
  component: Button,
} as Meta<typeof Button>;

export const Primary = () => <Button>Button</Button>;
