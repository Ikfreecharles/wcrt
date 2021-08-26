import { renderBeforeEach, screen, contentState } from 'testing/util';

import { ContentHeader } from './ContentHeader';

jest.mock('hooks/content');

describe('<ContentHeader />', () => {
  describe('default', () => {
    renderBeforeEach(
      <ContentHeader
        id="T:123:Article"
        label="Sample type"
        timestamp={new Date()}
      />
    );

    it('should render its label', () => {
      expect(screen.getByText('Sample type')).toBeInTheDocument();
    });

    it('should render its timestamp as relative date', () => {
      expect(screen.getByText('a few seconds ago')).toBeInTheDocument();
    });

    it('should render a subscribe button', () => {
      expect(
        screen.getByRole('button', { name: 'Subscribe' })
      ).toBeInTheDocument();
    });

    describe('subscribed', () => {
      beforeAll(() => {
        contentState.subscribed = true;
      });

      it('should render an unsubscribe button', () => {
        expect(
          screen.getByRole('button', { name: 'Stop subscribing' })
        ).toBeInTheDocument();
      });
    });
  });

  describe('with updated timestamp', () => {
    renderBeforeEach(
      <ContentHeader
        id="T:123:Article"
        label="Sample type"
        timestamp={new Date()}
        timestampFormat="relativeUpdateDate"
      />
    );

    it('should render its timestamp as relative update date', () => {
      expect(screen.getByText('updated a few seconds ago')).toBeInTheDocument();
    });
  });
});
