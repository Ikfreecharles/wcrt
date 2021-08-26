import { renderBeforeEach, screen, userEvent } from 'testing/util';
import { images } from 'testing/data';
import { DocumentFragment } from 'lib/graphql';

import { ImageSlider } from './ImageSlider';

describe('<ImageSlider />', () => {
  describe('default', () => {
    renderBeforeEach(
      <ImageSlider
        files={images as DocumentFragment[]}
        alt="Sample image"
        aspectRatio={16 / 9}
      />
    );

    it('should render its images', () => {
      expect(screen.getAllByRole('img', { name: 'Sample image' })).toHaveLength(
        images.length
      );
    });

    it('should render a navigation control for each image', () => {
      expect(screen.getAllByRole('button')).toHaveLength(images.length);
    });

    it('should navigate to an image on click', async () => {
      const button = screen.getByRole('button', { name: 'Show 2nd image' });
      userEvent.click(button);
      expect(button).toHaveAttribute('aria-current', 'true');
    });
  });

  describe('single file', () => {
    renderBeforeEach(
      <ImageSlider
        files={[images[0] as DocumentFragment]}
        alt="Sample image"
        aspectRatio={16 / 9}
      />
    );

    it('should not render navigation controls', () => {
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
