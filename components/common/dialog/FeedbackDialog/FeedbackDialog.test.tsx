import { renderBeforeEach, screen, formStatus } from 'testing/util';

import { FeedbackDialog } from './FeedbackDialog';

jest.mock('hooks/form');

describe('<FeedbackDialog />', () => {
  const setOpen = jest.fn();

  renderBeforeEach(<FeedbackDialog open setOpen={setOpen} />);

  it('should render a dialog', () => {
    expect(
      screen.getByRole('dialog', { name: 'Give feedback' })
    ).toBeInTheDocument();
  });

  it('should render an explanation text', () => {
    expect(
      screen.getByText(/We would like to become better/)
    ).toBeInTheDocument();
  });

  it('should render the feedback form', () => {
    expect(
      screen.getByRole('form', { name: 'Give feedback' })
    ).toBeInTheDocument();
  });

  it('should render a submit button', () => {
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('should disable the submit button initially', () => {
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  describe('valid form', () => {
    beforeAll(() => {
      formStatus.formStatus = 'valid';
    });

    it('should enable the submit button', () => {
      expect(screen.getByRole('button', { name: 'Send' })).not.toBeDisabled();
    });
  });

  describe('completed form', () => {
    beforeAll(() => {
      formStatus.formStatus = 'completed';
    });

    it('should render a success alert', () => {
      expect(
        screen.getByRole('heading', { name: 'Message sent' })
      ).toBeInTheDocument();
    });

    it('should render an additional close button', () => {
      expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(2);
    });
  });
});
