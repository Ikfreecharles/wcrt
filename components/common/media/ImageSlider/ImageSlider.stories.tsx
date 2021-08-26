import { Meta } from '@storybook/react/types-6-0';
import { Box } from '@material-ui/core';

import { images } from 'testing/data';
import { DocumentFragment } from 'lib/graphql';

import { ImageSlider } from './ImageSlider';

export default {
  title: 'Primary/ImageSlider',
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Default = () => (
  <ImageSlider
    files={images as DocumentFragment[]}
    alt="Sample image"
    aspectRatio={16 / 9}
  />
);
