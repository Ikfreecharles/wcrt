import {
  act,
  fireEvent,
  renderBeforeEach,
  screen,
  userEvent,
} from 'testing/util';
import { tasks } from 'testing/data';

import { TaskList } from './TaskList';

jest.mock('context/group');

describe('<TaskList />', () => {
  describe('default', () => {
    renderBeforeEach(<TaskList items={tasks} />);

    it('should render a list item for each task', () => {
      expect(screen.getAllByRole('listitem')).toHaveLength(tasks.length);
    });

    it('should render a checkbox for each task', () => {
      expect(screen.getAllByRole('checkbox')).toHaveLength(tasks.length);
    });

    it('should render a checked checkbox for each completed task', () => {
      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(
        tasks.filter((item) => item.completed).length
      );
    });

    it('should render the title of each item', () => {
      tasks.forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });
  });

  describe('interactive', () => {
    const onToggle = jest.fn();
    const onClick = jest.fn();

    renderBeforeEach(
      <TaskList items={tasks} showInput onToggle={onToggle} onClick={onClick} />
    );

    it('should toggle the complete status on checkbox click', async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: tasks[0].title }));
      });
      expect(onToggle).toHaveBeenCalledTimes(1);
      expect(onToggle).toHaveBeenCalledWith(!tasks[0].completed, tasks[0].id);
    });

    it('should execute the click action on button click', async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: tasks[0].title }));
      });
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(tasks[0].id);
    });
  });

  describe('input', () => {
    const onCreate = jest.fn();

    renderBeforeEach(<TaskList items={tasks} showInput onCreate={onCreate} />);

    it('should render a text field', () => {
      expect(screen.getByPlaceholderText('New task')).toBeInTheDocument();
    });

    it('should create a new task with enter key', async () => {
      await userEvent.type(
        screen.getByPlaceholderText('New task'),
        'Sample task{enter}',
        { delay: 1 }
      );
      expect(onCreate).toHaveBeenCalledTimes(1);
      expect(onCreate).toHaveBeenCalledWith('Sample task');
    });

    it('should create a new task and hide input on blur', async () => {
      await userEvent.type(
        screen.getByPlaceholderText('New task'),
        'Sample task',
        { delay: 1 }
      );
      await act(async () => {
        fireEvent.blur(screen.getByPlaceholderText('New task'));
      });
      expect(onCreate).toHaveBeenCalledTimes(1);
      expect(onCreate).toHaveBeenCalledWith('Sample task', true);
    });
  });

  describe('with pagination', () => {
    const pagination = {
      hasMore: true,
      fetchMore: jest.fn(),
    };

    renderBeforeEach(<TaskList items={tasks} pagination={pagination} />);

    it('should render a fetch more button', () => {
      expect(
        screen.getByRole('button', { name: 'Show more' })
      ).toBeInTheDocument();
    });

    it('should fetch more on button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Show more' }));
      expect(pagination.fetchMore).toHaveBeenCalledTimes(1);
    });
  });

  describe('with loading pagination', () => {
    const pagination = {
      hasMore: true,
      fetchMore: jest.fn(),
      loading: true,
    };

    renderBeforeEach(<TaskList items={tasks} pagination={pagination} />);

    it('should render a loading indicator', () => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should not render a fetch more button', () => {
      expect(
        screen.queryByRole('button', { name: 'Show more' })
      ).not.toBeInTheDocument();
    });
  });

  describe('empty', () => {
    renderBeforeEach(<TaskList items={[]} />);

    it('should render an empty state', () => {
      expect(screen.getByText('No tasks available')).toBeInTheDocument();
    });
  });
});
