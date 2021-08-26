import { ParsedUrlQuery } from 'querystring';
import kebabCase from 'lodash/kebabCase';

import { toArray } from 'util/type';

/** Returns a page URL for the given entity. */
export const getEntityPath = (id: string) => {
  const [_, uuid, type] = id.split(':');

  switch (type) {
    case 'Person':
      return `/profile/${uuid}`;
    default:
      return `/${kebabCase(type)}/${uuid}`;
  }
};

/** Returns a internal page URL for the given group and sub-path. */
export const getInternalPath = (id: string, path?: string) => {
  const uuid = id.split(':')[1];
  const topLevelPath = 'groups';

  return path ? `/${topLevelPath}/${uuid}${path}` : `/${topLevelPath}/${uuid}`;
};

/** Returns the parent path of a given path. */
export const raisePathLevel = (path: string) => {
  const segments = path.split('/').filter((segment) => !!segment);
  segments.pop();

  return '/' + segments.join('/');
};

/** Returns an absolute URL for the given path. */
export const createAbsoluteUrl = (path: string, removeQueryString = false) => {
  const url = new URL(path, process.env.NEXT_PUBLIC_APP_URL);

  if (removeQueryString) url.search = '';

  return url;
};

/** Determines whether a specific URL is a child of the given paths. */
export const comparePaths = (url: string, pathsToCompare: string[]) => {
  const currentPath = url.split('?')[0];
  const directMatch = pathsToCompare.includes(currentPath);
  const nestedMatches = pathsToCompare.filter(
    (item) =>
      item.includes('*') && currentPath.indexOf(item.replace('*', '')) === 0
  );

  return directMatch || nestedMatches.length > 0;
};

/** Returns specific query parameters of a search query string as object. */
export const extractQueryParameters = <K extends string>(
  query: ParsedUrlQuery,
  keys: K[]
) =>
  keys.reduce(
    (data, key) => ({
      ...data,
      [key]: toArray(query[key]),
    }),
    {} as Record<K, string[] | undefined>
  );
