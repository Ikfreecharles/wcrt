import { SomeRequired } from 'types';
import { Role } from 'lib/graphql';
import { getSharedFields, getEntityConnection } from 'testing/util/data';

export const newRole = (): SomeRequired<Role, '__typename'> => ({
  ...getSharedFields('Role'),

  name: 'groupMember',

  defines: getEntityConnection(),
});
