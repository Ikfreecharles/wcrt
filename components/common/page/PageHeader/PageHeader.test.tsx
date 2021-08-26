import { renderBeforeEach, screen } from 'testing/util';

import { PageHeader } from './PageHeader';

describe('<PageHeader />', () => {
  describe('default', () => {
    renderBeforeEach(<PageHeader title="Sample title" />);

    it('should render a heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Sample title' })
      ).toBeInTheDocument();
    });
  });

  describe('with back link', () => {
    renderBeforeEach(<PageHeader title="Sample title" parentUrl="/" />);

    it('should render a back link', () => {
      expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument();
    });
  });

  describe('with caption', () => {
    renderBeforeEach(
      <PageHeader title="Sample title" caption="Sample caption" />
    );

    it('should render the caption text', () => {
      expect(screen.getByText('Sample caption')).toBeInTheDocument();
    });
  });
});
