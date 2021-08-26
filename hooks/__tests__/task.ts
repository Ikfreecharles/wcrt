import { renderHook, TestingContext, apollo } from 'testing/util';
import { task } from 'testing/data';
import { TaskCreateDocument, TaskModifyDocument } from 'lib/graphql';
import { useTaskManagement, useTaskSubmit } from 'hooks/task';

describe('useTaskManagement', () => {
  beforeAll(() => {
    apollo.response = {
      taskCreate: { ...task },
      taskModify: { ...task },
    };
  });

  test('create new task', async () => {
    const { result } = renderHook(() => useTaskManagement('T:123:Group'), {
      wrapper: TestingContext,
    });
    await result.current.createTask('Sample task');
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(TaskCreateDocument, {
      group: 'T:123:Group',
      title: 'Sample task',
    });
  });

  test('complete existing task', async () => {
    const { result } = renderHook(() => useTaskManagement('T:123:Group'), {
      wrapper: TestingContext,
    });
    await result.current.toggleTask(true, 'T:123:Task');
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(TaskModifyDocument, {
      task: 'T:123:Task',
      completed: true,
    });
  });

  test('revert completed task', async () => {
    const { result } = renderHook(() => useTaskManagement('T:123:Group'), {
      wrapper: TestingContext,
    });
    await result.current.toggleTask(false, 'T:123:Task');
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(TaskModifyDocument, {
      task: 'T:123:Task',
      completed: false,
    });
  });
});

describe('useTaskSubmit', () => {
  test('modify existing task', async () => {
    const { result } = renderHook(() => useTaskSubmit('T:123:Task'), {
      wrapper: TestingContext,
    });
    await result.current({ title: 'Sample task', completed: true });
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(TaskModifyDocument, {
      task: 'T:123:Task',
      title: 'Sample task',
      completed: true,
    });
  });
});
