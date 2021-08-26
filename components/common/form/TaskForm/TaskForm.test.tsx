import {
  renderBeforeEach,
  screen,
  userEvent,
  fireEvent,
  act,
  submit,
  apollo,
} from 'testing/util';

import { TaskForm } from './TaskForm';

jest.mock('hooks/task');

describe('<TaskForm />', () => {
  const setStatus = jest.fn();
  const setResult = jest.fn();

  beforeAll(() => {
    apollo.response = {
      task: {
        title: 'Sample title',
        completed: false,
      },
    };
  });

  renderBeforeEach(
    <TaskForm
      taskId="T:123:Task"
      mode="onChange"
      setStatus={setStatus}
      setResult={setResult}
      id="form-123"
    />
  );

  it('should render a form', () => {
    expect(screen.getByRole('form', { name: 'Edit task' })).toBeInTheDocument();
  });

  it('should render its form elements', () => {
    expect(screen.getByRole('textbox', { name: 'Title' })).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Completed' })
    ).toBeInTheDocument();
  });

  it('should render its default values', () => {
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue(
      'Sample title'
    );
    expect(
      screen.getByRole('checkbox', { name: 'Completed' })
    ).not.toBeChecked();
  });

  it('should edit an existing task on submit', async () => {
    userEvent.clear(screen.getByRole('textbox', { name: 'Title' }));
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Title' }),
      'New title',
      { delay: 1 }
    );
    await act(async () => {
      userEvent.click(screen.getByRole('checkbox', { name: 'Completed' }));
    });
    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: 'Edit task' }));
    });
    expect(setStatus).toHaveBeenCalledWith('submitting');
    expect(setStatus).toHaveBeenCalledWith('completed');
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith('T:123:Task', {
      title: 'New title',
      completed: true,
    });
  });
});
