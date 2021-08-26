import {
  renderBeforeEach,
  screen,
  userEvent,
  act,
  apollo,
  graphqlResponse,
} from 'testing/util';

import { GroupCreateDialog } from './GroupCreateDialog';

jest.mock('hooks/group');

describe('<GroupCreateDialog />', () => {
  const setOpen = jest.fn();

  beforeAll(() => {
    apollo.response = {
      ...graphqlResponse.categories,
      ...graphqlResponse.addresses,
    };
  });

  renderBeforeEach(<GroupCreateDialog open setOpen={setOpen} />);

  it('should render a dialog', () => {
    expect(
      screen.getByRole('dialog', { name: 'Create new group' })
    ).toBeInTheDocument();
  });

  it('should render an illustration', () => {
    expect(screen.getByRole('img', { name: 'Whiteboard' })).toBeInTheDocument();
  });

  it('should render an explanation text', () => {
    expect(screen.getByText(/A group enables new forms/)).toBeInTheDocument();
  });

  it('should render the group form', () => {
    expect(
      screen.getByRole('form', { name: 'Create new group' })
    ).toBeInTheDocument();
  });

  it('should render a start button', () => {
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });

  it('should render a cancel button', () => {
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('should allow to navigate within the group form', async () => {
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Start' }));
    });
    expect(screen.getByText(/The following information/)).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Previous' }));
    });
    expect(screen.getByText(/A group enables new forms/)).toBeInTheDocument();
  });

  it('should render the form progress', async () => {
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Start' }));
    });
    expect(
      screen.getByRole('button', { name: 'Brief introduction' })
    ).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Description' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'More details' })).toBeDisabled();
  });

  it('should allow to complete the group form', async () => {
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Start' }));
    });
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Name' }),
      'Sample name',
      { delay: 1 }
    );
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Next' }));
    });
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Next' }));
    });
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Create' }));
    });
    expect(
      screen.getByRole('heading', { name: 'Your new group is ready' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'View group' })).toHaveAttribute(
      'href',
      '/group/123'
    );
  });
});
