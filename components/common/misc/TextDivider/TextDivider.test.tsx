import { renderBeforeEach, screen } from 'testing/util';

import { TextDivider } from './TextDivider';

describe('<TextDivider />', () => {
  describe('default', () => {
    renderBeforeEach(<TextDivider label="Sample label" />);

    it('should render the label as heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Sample label' })
      ).toBeInTheDocument();
    });
  });

  describe('with count', () => {
    renderBeforeEach(<TextDivider label="Sample label" count={3} />);

    it('should render the count as text', () => {
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });
});
