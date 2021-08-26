import faker from 'faker';

import { SomeRequired } from 'types';
import { ContentConnection, Group, Visibility } from 'lib/graphql';
import {
  getSharedFields,
  getReference,
  getEntityConnection,
} from 'testing/util/data';
import {
  newCategory,
  newArticle,
  newTopic,
  newLogoImage,
  newMembership,
  newAddress,
  newTask,
  newImpulse,
} from 'testing/data';
import { newMembershipInvite } from './membershipInvite';
import { newMembershipRequest } from './membershipRequest';

export const newGroup = (
  i?: number
): SomeRequired<Group, '__typename'> & {
  createsArticle: ContentConnection;
  createsTopic: ContentConnection;
} => ({
  ...getSharedFields('Group'),
  _viewer: {
    administeredBy: getEntityConnection(newMembership, i),
  } as any,

  contactInfo: faker.lorem.sentences(1),
  info: faker.company.catchPhrase(),
  intro: faker.lorem.sentences(2),
  name: faker.company.companyName(),
  visibility: Visibility.Public,
  chatChannel: `${faker.random.uuid()}:ChatChannel`,

  administeredBy: getEntityConnection(newMembership, i),
  categorizedBy: getReference(newCategory, i),
  covers: getReference(newImpulse, i),
  creates: getEntityConnection(newArticle, i),
  imagedBy: getReference(newLogoImage, i),
  knownBy: getEntityConnection(),
  knows: getEntityConnection(),
  locatedByAddress: getReference(newAddress, i),
  managesContent: getEntityConnection(newArticle, i),
  managesMembershipInvite: getEntityConnection(newMembershipInvite, i),
  managesTask: getEntityConnection(newTask, i),
  receives: getEntityConnection(newMembershipRequest, i),
  responds: getEntityConnection(),

  createsArticle: getEntityConnection(newArticle, i),
  createsTopic: getEntityConnection(newTopic, i),
});
