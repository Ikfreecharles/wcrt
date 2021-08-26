import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { ExternalMedia } from './ExternalMedia';

describe('<ExternalMedia />', () => {
  renderBeforeEach(
    <ExternalMedia
      link="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
      aspectRatio={16 / 9}
    />
  );

  it('should render a button with the service name', () => {
    expect(
      screen.getByRole('button', { name: 'Show content from youtube.com' })
    ).toBeInTheDocument();
  });

  it('should render an iframe on click', () => {
    userEvent.click(screen.getByRole('button', { name: /Show content/ }));
    expect(screen.getByTestId('iframe')).toBeInTheDocument();
  });
});
