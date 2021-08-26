import dayjs from 'dayjs';
import { renderBeforeEach, screen } from 'testing/util';

import { ChatDivider } from './ChatDivider';

describe('<ChatDivider />', () => {
  describe('default', () => {
    renderBeforeEach(<ChatDivider />);

    it('should render an indicator for new messages', () => {
      expect(screen.getByText('New')).toBeInTheDocument();
    });
  });

  describe('with date', () => {
    renderBeforeEach(<ChatDivider date={new Date()} />);

    it('should render the date as label', () => {
      expect(
        screen.getByText(dayjs().format('dddd, MMMM D'))
      ).toBeInTheDocument();
    });
  });
});
