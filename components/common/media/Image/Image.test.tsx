import { renderBeforeEach, screen, fireEvent } from 'testing/util';

import { Image } from './Image';

describe('<Image />', () => {
  describe('default', () => {
    renderBeforeEach(
      <Image
        file={{
          id: 'T:123:Image',
          resourceLocation: 'https://source.unsplash.com/1600x900/?city',
        }}
        alt="Sample Image"
        aspectRatio={16 / 9}
      />
    );

    describe('loading', () => {
      it('should render a loading indicator', () => {
        expect(
          screen.getByRole('progressbar', { name: 'Image is loading …' })
        ).toBeInTheDocument();
      });

      it('should render the image', () => {
        expect(
          screen.getByRole('img', { name: 'Sample Image' })
        ).toBeInTheDocument();
      });
    });

    describe('ready', () => {
      beforeEach(() => {
        fireEvent.load(screen.getByRole('img'));
      });

      it('should remove the loading indicator on load', () => {
        expect(
          screen.queryByRole('progressbar', { name: 'Image is loading …' })
        ).not.toBeInTheDocument();
      });
    });

    describe('error', () => {
      beforeEach(() => {
        fireEvent.error(screen.getByRole('img'));
      });

      it('should render a fallback on error', () => {
        expect(screen.getByTestId('fallback')).toBeInTheDocument();
      });
    });
  });

  describe('undefined', () => {
    renderBeforeEach(<Image alt="Undefined image" />);

    it('should render a fallback for an undefined image', () => {
      expect(screen.getByTestId('fallback')).toBeInTheDocument();
    });
  });
});
