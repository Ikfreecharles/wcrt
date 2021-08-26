import {
  renderBeforeEach,
  screen,
  apollo,
  userEvent,
  enqueueSnackbar,
  act,
  submit,
} from 'testing/util';
import { task } from 'testing/data';

import { GroupTask } from './GroupTask';

jest.mock('context/group');
jest.mock('hooks/task');
jest.mock('hooks/entity');

describe('<GroupTask />', () => {
  beforeAll(() => {
    apollo.response = {
      task,
    };
  });

  renderBeforeEach(<GroupTask id={task.id} />);

  it('should render a heading', () => {
    expect(
      screen.getByRole('heading', { name: `Task: ${task.title}` })
    ).toBeInTheDocument();
  });

  it('should render the task form', () => {
    expect(screen.getByRole('form', { name: 'Edit task' })).toBeInTheDocument();
  });

  it('should render a save button', () => {
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('should render a delete button', () => {
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  describe('on save button click', () => {
    beforeEach(async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: 'Save' }));
      });
    });

    it('should submit the form', () => {
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith(task.id, expect.anything());
    });

    it('should trigger a notification', () => {
      expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
      expect(enqueueSnackbar).toHaveBeenCalledWith('Changes saved.');
    });
  });

  describe('on delete button click', () => {
    beforeEach(() => {
      userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    });

    it('should trigger a delete', () => {
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('delete', task.id);
    });

    it('should trigger a notification', () => {
      expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
      expect(enqueueSnackbar).toHaveBeenCalledWith('Task deleted.');
    });
  });
});
