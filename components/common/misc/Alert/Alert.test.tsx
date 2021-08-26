import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { Alert } from './Alert';

const onClick = jest.fn();

describe('<Alert />', () => {
  describe('error', () => {
    renderBeforeEach(<Alert type="error" />);

    it('should render its title as heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Something went wrong' })
      ).toBeInTheDocument();
    });

    it('should render its body text', () => {
      expect(screen.getByText(/Your request/)).toBeInTheDocument();
    });

    it('should render a contact button', () => {
      expect(
        screen.getByRole('link', { name: 'Contact support' })
      ).toBeInTheDocument();
    });
  });

  describe('remoteError', () => {
    renderBeforeEach(<Alert type="remoteError" info="Remote error message" />);

    it('should render the remote error', () => {
      expect(screen.getByText('Remote error message')).toBeInTheDocument();
    });

    it('should render a reload button', () => {
      expect(
        screen.getByRole('link', { name: 'Try again' })
      ).toBeInTheDocument();
    });
  });

  describe('messageSent', () => {
    renderBeforeEach(<Alert type="messageSent" onClick={onClick} />);

    it('should render a confirm button', () => {
      userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('custom', () => {
    renderBeforeEach(
      <Alert
        type="comeBackLater"
        title="Sample title"
        message="Sample message"
        buttonLabel="Sample button"
        onClick={onClick}
      />
    );

    it('should render the custom message as heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Sample title' })
      ).toBeInTheDocument();
    });

    it('should render the custom message text', () => {
      expect(screen.getByText('Sample message')).toBeInTheDocument();
    });

    it('should render the custom button label', () => {
      expect(
        screen.getByRole('button', { name: 'Sample button' })
      ).toBeInTheDocument();
    });
  });
});
