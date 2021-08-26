import {
  act,
  apollo,
  renderBeforeEach,
  routerPush,
  screen,
  submit,
  userEvent,
} from 'testing/util';
import { group } from 'testing/data';

import { GroupTasks } from './GroupTasks';

jest.mock('context/group');
jest.mock('hooks/task');

describe('<GroupTasks />', () => {
  beforeAll(() => {
    apollo.response = {
      group,
    };
  });

  renderBeforeEach(<GroupTasks />);

  it('should render a heading', () => {
    expect(screen.getByRole('heading', { name: 'Tasks' })).toBeInTheDocument();
  });

  it('should render the group tasks as list items', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      group.managesTask.count
    );
  });

  it('should render a create button', () => {
    expect(
      screen.getByRole('button', { name: 'Add task' })
    ).toBeInTheDocument();
  });

  it('should toggle the complete status on checkbox click', async () => {
    await act(async () => {
      userEvent.click(
        screen.getByRole('checkbox', {
          name: group.managesTask.edges[0].node.title,
        })
      );
    });
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith(
      group.managesTask.edges[0].node.completed ? 'revertTask' : 'completeTask',
      group.managesTask.edges[0].node.id
    );
  });

  it('should navigate to the task page on button click', async () => {
    await act(async () => {
      userEvent.click(
        screen.getByRole('button', {
          name: group.managesTask.edges[0].node.title,
        })
      );
    });
    expect(routerPush).toHaveBeenCalledTimes(1);
    expect(routerPush).toHaveBeenCalledWith(
      `/groups/123/tasks/${group.managesTask.edges[0].node.id.split(':')[1]}`
    );
  });

  describe('new task', () => {
    beforeEach(() => {
      userEvent.click(screen.getByRole('button', { name: 'Add task' }));
    });

    it('should render a text field', () => {
      expect(screen.getByPlaceholderText('New task')).toBeInTheDocument();
    });

    it('should create a new task', async () => {
      await userEvent.type(
        screen.getByPlaceholderText('New task'),
        'Sample task{enter}',
        { delay: 1 }
      );
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('task', 'Sample task');
    });
  });
});
