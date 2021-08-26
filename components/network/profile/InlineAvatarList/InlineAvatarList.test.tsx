import { renderBeforeEach, screen } from 'testing/util';
import { newPerson } from 'testing/data';
import { AgentAvatarFragment } from 'lib/graphql';

import { InlineAvatarList } from './InlineAvatarList';

describe('<InlineAvatarList />', () => {
  const persons: AgentAvatarFragment[] = [];
  for (let i = 0; i < 8; i++) {
    persons.push(newPerson());
  }

  renderBeforeEach(<InlineAvatarList items={persons} />);

  it('should render an image for each avatar', () => {
    expect(screen.getAllByRole('img')).toHaveLength(persons.length);
  });

  describe('after layout calculation', () => {
    beforeAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        value: 200,
      });
    });

    it('should render an image for the first few avatars', () => {
      expect(screen.getAllByRole('img')).toHaveLength(5);
    });

    it('should render the number of hidden avatars', () => {
      expect(screen.getByText(`+${persons.length - 5}`)).toBeInTheDocument();
    });
  });
});
