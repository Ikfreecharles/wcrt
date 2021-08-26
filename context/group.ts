import { createContext } from 'react';

import { GROUP_ROLE_NAMES } from 'lib/constants';

type GroupContext = {
  groupId: string;
  groupName: string;
  chatChannel?: string | null;
  viewerRole: keyof typeof GROUP_ROLE_NAMES;
};

/** Shares some group meta data between the group page and the group components. */
export const GroupContext = createContext<GroupContext>({} as GroupContext);

export const GroupProvider = GroupContext.Provider;
