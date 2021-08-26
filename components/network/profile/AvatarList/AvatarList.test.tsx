import { renderBeforeEach, screen } from 'testing/util';
import { newPerson } from 'testing/data';
import { AgentAvatarFragment } from 'lib/graphql';

import { AvatarList } from './AvatarList';

describe('<AvatarList />', () => {
  const persons: AgentAvatarFragment[] = [];
  for (let i = 0; i < 8; i++) {
    persons.push(newPerson());
  }

  describe('default', () => {
    renderBeforeEach(<AvatarList items={persons} />);

    it('should render an image for each avatar', () => {
      expect(screen.getAllByRole('img')).toHaveLength(persons.length);
    });
  });

  describe('linked', () => {
    renderBeforeEach(<AvatarList linked items={persons} />);

    it('should render a link for each avatar', () => {
      expect(screen.getAllByRole('link')).toHaveLength(persons.length);
    });
  });

  describe('compact', () => {
    renderBeforeEach(<AvatarList compact items={persons} maxItems={5} />);

    it('should render an image for the first few avatars', () => {
      expect(screen.getAllByRole('img')).toHaveLength(4);
    });

    it('should render the number of hidden avatars', () => {
      expect(screen.getByText('+4')).toBeInTheDocument();
    });
  });
});
