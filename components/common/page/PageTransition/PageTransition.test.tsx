import { render, renderBeforeEach, screen, waitFor } from 'testing/util';

import { PageTransition } from './PageTransition';

const onHidden = jest.fn();

describe('<PageTransition />', () => {
  describe('default', () => {
    renderBeforeEach(<PageTransition>Sample content</PageTransition>);

    it('should render its content', () => {
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });
  });

  describe('hidden', () => {
    renderBeforeEach(
      <PageTransition hidden onHidden={onHidden}>
        Sample content
      </PageTransition>
    );

    it('should hide its content initially', () => {
      expect(screen.getByText('Sample content')).not.toBeVisible();
    });

    it('should not execute its callback', () => {
      expect(onHidden).toHaveBeenCalledTimes(0);
    });
  });

  describe('updating to hidden', () => {
    it('should execute its callback once hidden', async () => {
      const { rerender } = render(
        <PageTransition hidden={false} onHidden={onHidden}>
          Sample content
        </PageTransition>
      );

      rerender(
        <PageTransition hidden={true} onHidden={onHidden}>
          Sample content
        </PageTransition>
      );

      await waitFor(() => expect(onHidden).toHaveBeenCalledTimes(1));
    });
  });
});
