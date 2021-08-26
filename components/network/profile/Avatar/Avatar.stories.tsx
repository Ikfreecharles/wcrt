import { Meta, Story } from '@storybook/react/types-6-0';

import { person, group } from 'testing/data';

import { Avatar } from './Avatar';

export default {
  title: 'Secondary/Avatar',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
  },
} as Meta;

export const Default: Story = (args) => <Avatar data={person} {...args} />;

export const Group: Story = (args) => <Avatar data={group} {...args} />;

export const Fallback: Story = (args) => (
  <Avatar data={{ ...person, imagedBy: null }} {...args} />
);
