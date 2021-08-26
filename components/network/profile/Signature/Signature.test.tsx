import { renderBeforeEach, screen } from 'testing/util';
import { person } from 'testing/data';

import { Signature } from './Signature';

describe('<Signature />', () => {
  describe('default', () => {
    renderBeforeEach(<Signature data={person} />);

    it('should render an image', () => {
      expect(
        screen.getByRole('img', { name: person.name })
      ).toBeInTheDocument();
    });

    it('should render the name', () => {
      expect(screen.getByText(person.name)).toBeInTheDocument();
    });

    it('should render the info', () => {
      expect(screen.getByText(person.info!)).toBeInTheDocument();
    });
  });

  describe('compact', () => {
    renderBeforeEach(<Signature compact data={person} />);

    it('should not render the info', () => {
      expect(screen.queryByText(person.info!)).not.toBeInTheDocument();
    });
  });
});
