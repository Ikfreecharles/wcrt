import faker from 'faker';

import { SomeRequired } from 'types';
import { Task } from 'lib/graphql';
import { getSharedFields, getEntityConnection } from 'testing/util/data';

export const newTask = (): SomeRequired<Task, '__typename'> => {
  const isCompleted = faker.random.boolean();

  return {
    ...getSharedFields('Task'),

    title: faker.lorem.sentence(),
    completed: isCompleted,
    completedAt: isCompleted ? faker.date.recent() : null,

    managedBy: getEntityConnection(),
  };
};
