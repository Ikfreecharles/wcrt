import dayjs from 'dayjs';

import { chatMessage, person } from 'testing/data';
import { renderBeforeEach, screen } from 'testing/util';

import { ChatMessage } from './ChatMessage';

describe('<ChatMessage />', () => {
  describe('default', () => {
    renderBeforeEach(
      <ChatMessage
        data={chatMessage}
        author={{ loading: false, data: person }}
      />
    );

    it('should render its timestamp', () => {
      expect(
        screen.getByText(dayjs(chatMessage.createdAt).format('h:mm A'))
      ).toBeInTheDocument();
    });

    it('should render its author avatar', () => {
      expect(
        screen.getByRole('img', { name: person.name })
      ).toBeInTheDocument();
    });

    it('should render its author name', () => {
      expect(screen.getByText(person.name)).toBeInTheDocument();
    });

    it('should render its text', () => {
      expect(screen.getByText(chatMessage.content!)).toBeInTheDocument();
    });
  });

  describe('pending author', () => {
    renderBeforeEach(
      <ChatMessage data={chatMessage} author={{ loading: true }} />
    );

    it('should render a loading indicator for the author avatar', () => {
      expect(
        screen.getByRole('progressbar', { name: 'Image is loading …' })
      ).toBeInTheDocument();
    });

    it('should render a loading indicator for the author name', () => {
      expect(
        screen.getByRole('progressbar', { name: 'Name is loading …' })
      ).toBeInTheDocument();
    });
  });

  describe('unknown author', () => {
    renderBeforeEach(
      <ChatMessage data={chatMessage} author={{ loading: false }} />
    );

    it('should render a placeholder author', () => {
      expect(screen.getByText('Unknown')).toBeInTheDocument();
    });
  });
});
