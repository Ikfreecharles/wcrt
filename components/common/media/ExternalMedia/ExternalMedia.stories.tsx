import { Meta } from '@storybook/react/types-6-0';

import { ExternalMedia } from './ExternalMedia';

export default {
  title: 'Secondary/ExternalMedia',
  decorators: [],
} as Meta;

export const Default = () => (
  <ExternalMedia
    link="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    aspectRatio={16 / 9}
  />
);
