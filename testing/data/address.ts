import faker from 'faker';

import { SomeRequired } from 'types';
import { Address } from 'lib/graphql';
import { getSharedFields, getEntityConnection } from 'testing/util/data';

export const newAddress = (): SomeRequired<Address, '__typename'> => ({
  ...getSharedFields('Address'),

  addressCountry: faker.address.country(),
  addressLocality: faker.address.city(),
  name: faker.address.streetAddress(),

  locatesAgent: getEntityConnection(),
  locatesContent: getEntityConnection(),
});
