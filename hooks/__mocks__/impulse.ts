import { submit } from 'testing/util';

export const useImpulseSubmit =
  (id?: string) =>
  async (...args: any) => {
    submit(id || 'impulse', ...args);
    return id || 'T:123:Impulse';
  };
