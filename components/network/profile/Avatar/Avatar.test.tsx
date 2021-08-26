import { renderBeforeEach, screen } from 'testing/util';
import { person, group } from 'testing/data';

import { Avatar } from './Avatar';

describe('<Avatar />', () => {
  describe('default', () => {
    renderBeforeEach(<Avatar data={person} />);

    it('should render an image', () => {
      expect(
        screen.getByRole('img', { name: person.name })
      ).toBeInTheDocument();
    });
  });

  describe('linked', () => {
    renderBeforeEach(<Avatar linked data={person} />);

    it('should render a link', () => {
      expect(
        screen.getByRole('link', { name: person.name })
      ).toBeInTheDocument();
    });
  });

  describe('group', () => {
    renderBeforeEach(<Avatar data={group} />);

    it('should render an image', () => {
      expect(
        screen.getByRole('img', { name: `Group: ${group.name}` })
      ).toBeInTheDocument();
    });
  });
});
