import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { impulse } from 'testing/data';

import { ImpulseTeaser } from './ImpulseTeaser';

export default {
  title: 'Content/Teaser/ImpulseTeaser',
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = () => <ImpulseTeaser data={impulse as any} />;
