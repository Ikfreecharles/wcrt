import faker from 'faker';

import { submit } from 'testing/util';

export const useImageUpload =
  () =>
  async (...args: any) => {
    submit('image', ...args);
    return {
      id: `${faker.random.uuid()}:Image`,
      resourceLocation: faker.image.imageUrl(320, 320, 'people', true),
    };
  };
