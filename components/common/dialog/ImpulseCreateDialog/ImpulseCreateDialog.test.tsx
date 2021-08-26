import {
  renderBeforeEach,
  screen,
  userEvent,
  act,
  apollo,
  graphqlResponse,
} from 'testing/util';

import { ImpulseCreateDialog } from './ImpulseCreateDialog';

jest.mock('hooks/impulse');

describe('<ImpulseCreateDialog />', () => {
  const setOpen = jest.fn();

  beforeAll(() => {
    apollo.response = {
      ...graphqlResponse.categories,
      ...graphqlResponse.addresses,
    };
  });

  renderBeforeEach(<ImpulseCreateDialog open setOpen={setOpen} />);

  it('should render a dialog', () => {
    expect(
      screen.getByRole('dialog', { name: 'Create new impulse' })
    ).toBeInTheDocument();
  });

  it('should render an illustration', () => {
    expect(screen.getByRole('img', { name: 'Wireframe' })).toBeInTheDocument();
  });

  it('should render an explanation text', () => {
    expect(screen.getByText(/You have a question/)).toBeInTheDocument();
  });

  it('should render the impulse form', () => {
    expect(
      screen.getByRole('form', { name: 'Create new impulse' })
    ).toBeInTheDocument();
  });

  it('should render a start button', () => {
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });

  it('should render a cancel button', () => {
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('should allow to navigate within the impulse form', async () => {
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Start' }));
    });
    expect(screen.getByText(/First of all/)).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Previous' }));
    });
    expect(screen.getByText(/You have a question/)).toBeInTheDocument();
  });

  it('should render the form progress', async () => {
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Start' }));
    });
    expect(
      screen.getByRole('button', { name: 'Problem description' })
    ).toBeEnabled();
    expect(screen.getByRole('button', { name: 'More details' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Possible solution' })
    ).toBeDisabled();
  });

  it('should allow to complete the impulse form', async () => {
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Start' }));
    });
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Describe the problem …' }),
      'Sample description',
      { delay: 1 }
    );
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Next' }));
    });
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Impulse title' }),
      'Sample title',
      { delay: 1 }
    );
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Next' }));
    });
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Publish' }));
    });
    expect(
      screen.getByRole('heading', { name: 'Impulse successfully published' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'View impulse' })).toHaveAttribute(
      'href',
      '/impulse/123'
    );
  });
});
