import { SomeRequired } from 'types';
import { Category } from 'lib/graphql';
import { getSharedFields, getEntityConnection } from 'testing/util/data';

let i = 0;
const names = [
  'administration',
  'culture',
  'economy',
  'education',
  'environment',
  'housing',
  'leisure',
  'planning',
  'social',
  'traffic',
];

export const newCategory = (): SomeRequired<Category, '__typename'> => ({
  ...getSharedFields('Category'),

  name: names[i++ % names.length],

  categorizesContent: getEntityConnection(),
  categorizesGroup: getEntityConnection(),
});
