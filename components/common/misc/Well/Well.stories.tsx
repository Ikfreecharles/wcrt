import { Meta, Story } from '@storybook/react/types-6-0';
import { Typography } from '@material-ui/core';
import { BiPulse, BiGroup, BiMap } from 'react-icons/bi';

import { IconWrapper } from 'components/common/misc';

import { Well } from './Well';

export default {
  title: 'Secondary/Well',
  argTypes: {
    vertical: {
      control: 'boolean',
    },
  },
} as Meta;

export const Default: Story = (args) => (
  <Well vertical={args.vertical}>
    <IconWrapper icon={BiPulse}>
      <Typography component="span" variant="subtitle2">
        Lorem
      </Typography>
    </IconWrapper>

    <IconWrapper icon={BiGroup}>
      <Typography component="span" variant="subtitle2">
        Ipsum
      </Typography>
    </IconWrapper>

    <IconWrapper icon={BiMap}>
      <Typography component="span" variant="subtitle2">
        Dolor
      </Typography>
    </IconWrapper>
  </Well>
);
