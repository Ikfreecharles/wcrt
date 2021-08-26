import { useUID } from 'react-uid';

/** Generates an unique ID with a custom prefix. Meant to be used by actual HTML elements. */
export const useElementId = (prefix: string) => {
  const uid = useUID();

  return `${prefix}-${uid}`;
};
