import faker from 'faker';

import { SomeRequired } from 'types';
import { Image } from 'lib/graphql';
import { getSharedFields, getEntityConnection } from 'testing/util/data';

export const newImage = (): SomeRequired<Image, '__typename'> => ({
  ...getSharedFields('Image'),

  name: faker.system.commonFileName('jpg'),
  resourceLocation: faker.image.imageUrl(1200, 675, undefined, true),

  imagesContent: getEntityConnection(),
  imagesAgent: getEntityConnection(),
});

export const newAvatarImage = (): SomeRequired<Image, '__typename'> => ({
  ...getSharedFields('Image'),

  name: faker.system.commonFileName('jpg'),
  resourceLocation: faker.image.imageUrl(320, 320, 'people', true),

  imagesContent: getEntityConnection(),
  imagesAgent: getEntityConnection(),
});

export const newLogoImage = (): SomeRequired<Image, '__typename'> => ({
  ...getSharedFields('Image'),

  name: faker.system.commonFileName('jpg'),
  resourceLocation: faker.image.imageUrl(320, 320, 'tech', true),

  imagesContent: getEntityConnection(),
  imagesAgent: getEntityConnection(),
});
