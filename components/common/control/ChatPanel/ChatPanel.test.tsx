import { act, renderBeforeEach, screen, submit, userEvent } from 'testing/util';

import { ChatPanel } from './ChatPanel';

jest.mock('lib/grpc');

describe('<ChatPanel />', () => {
  renderBeforeEach(<ChatPanel channelId="T:123:ChatChannel" />);

  it('should render a text field', () => {
    expect(
      screen.getByRole('textbox', { name: 'Type message …' })
    ).toBeInTheDocument();
  });

  it('should render a submit button', () => {
    expect(
      screen.getByRole('button', { name: 'Send message' })
    ).toBeInTheDocument();
  });

  it('should disable the submit button initially', () => {
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled();
  });

  describe('input', () => {
    beforeEach(async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Type message …' }),
        'Sample message',
        { delay: 1 }
      );
    });

    it('should enable the submit button', () => {
      expect(
        screen.getByRole('button', { name: 'Send message' })
      ).toBeEnabled();
    });

    describe('submit', () => {
      beforeEach(async () => {
        await act(async () => {
          userEvent.click(screen.getByRole('button', { name: 'Send message' }));
        });
      });

      it('should submit a message to the channel', () => {
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submit).toHaveBeenCalledWith(
          'chatMessage',
          'T:123:ChatChannel',
          'Sample message'
        );
      });

      it('should reset the text field', () => {
        expect(
          screen.getByRole('textbox', { name: 'Type message …' })
        ).toHaveValue('');
      });
    });
  });
});
