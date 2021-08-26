import { Meta } from '@storybook/react/types-6-0';
import { Box } from '@material-ui/core';

import { Image } from './Image';

export default {
  title: 'Secondary/Image',
} as Meta;

const src = {
  id: 'T:123:Image',
  resourceLocation: 'https://source.unsplash.com/1600x900/?city',
};

export const Default = () => (
  <Image file={src} alt="Lorem ipsum" aspectRatio={16 / 9} />
);

export const Fallback = () => <Image aspectRatio={16 / 9} alt="Lorem ipsum" />;

export const Background = () => (
  <Box position="absolute" top="0" left="0" width="100%" height="100%">
    <Image file={src} alt="Lorem ipsum" backgroundBlend />
  </Box>
);
