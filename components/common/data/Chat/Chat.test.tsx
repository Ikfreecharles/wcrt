import { renderBeforeEach, screen, apollo } from 'testing/util';
import { chatMessages } from 'testing/data';

import { Chat } from './Chat';

jest.mock('lib/grpc');

describe('<Chat />', () => {
  renderBeforeEach(<Chat channelId="T:123:ChatChannel" />);

  describe('default', () => {
    beforeAll(() => {
      apollo.response = {
        chatChannel: {
          messages: chatMessages,
        },
      };
    });

    it('should render a message log', () => {
      expect(screen.getByRole('log')).toBeInTheDocument();
    });

    it('should render its messages', () => {
      chatMessages.forEach((message) => {
        expect(screen.getByText(message.content!)).toBeInTheDocument();
      });
    });
  });

  describe('with new message', () => {
    beforeAll(() => {
      apollo.response = {
        chatChannel: {
          newCount: 1,
          messages: chatMessages,
        },
      };
    });

    it('should render an new indicator', () => {
      expect(screen.getByText('New')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    beforeAll(() => {
      apollo.response = {
        chatChannel: {
          messages: [],
        },
      };
    });

    it('should render an empty state', () => {
      expect(screen.getByText('No messages yet')).toBeInTheDocument();
    });
  });
});
