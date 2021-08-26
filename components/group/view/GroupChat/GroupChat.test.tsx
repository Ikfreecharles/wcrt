import { renderBeforeEach, screen } from 'testing/util';

import { GroupChat } from './GroupChat';

jest.mock('context/group');

describe('<GroupChat />', () => {
  renderBeforeEach(<GroupChat />);

  it('should render a heading', () => {
    expect(screen.getByRole('heading', { name: 'Chat' })).toBeInTheDocument();
  });

  it('should render the chat', () => {
    expect(screen.getByRole('log')).toBeInTheDocument();
  });

  it('should render the chat panel', () => {
    expect(
      screen.getByRole('textbox', { name: 'Type message …' })
    ).toBeInTheDocument();
  });
});
