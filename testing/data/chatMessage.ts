import faker from 'faker';

import { SomeRequired } from 'types';
import { ChatMessage } from 'lib/graphql';
import { getSharedFields } from 'testing/util/data';

export const newChatMessage = (): SomeRequired<ChatMessage, '__typename'> => ({
  ...getSharedFields('ChatMessage'),

  authorId: `${faker.random.uuid()}:OnlineAccount`,
  channelId: `${faker.random.uuid()}:ChatChannel`,
  content: faker.lorem.paragraph(),
});
