import { submit } from 'testing/util';

export const useTaskManagement = () => ({
  createTask: async (...args: any) => {
    submit('task', ...args);
    return 'T:123:Task';
  },
  toggleTask: async (completed: boolean, ...args: any) => {
    submit(completed ? 'completeTask' : 'revertTask', ...args);
    return completed ? new Date() : null;
  },
});

export const useTaskSubmit =
  (id: string) =>
  async (...args: any) => {
    submit(id, ...args);
  };
