import { submit } from 'testing/util';

export const useGroupSubmit =
  (id?: string, impulse?: string) =>
  async (...args: any) => {
    if (id) submit(id, ...args);
    else if (impulse) submit('groupWithImpulse', impulse, ...args);
    else submit('group', ...args);
    return id || 'T:123:Group';
  };
