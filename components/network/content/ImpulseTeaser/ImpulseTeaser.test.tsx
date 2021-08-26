import dayjs from 'dayjs';

import { renderBeforeEach, screen } from 'testing/util';
import { impulse } from 'testing/data';

import { ImpulseTeaser } from './ImpulseTeaser';

describe('<ImpulseTeaser />', () => {
  renderBeforeEach(<ImpulseTeaser data={impulse as any} />);

  it('should render its content type', () => {
    expect(screen.getByText('Impulse')).toBeInTheDocument();
  });

  it('should render its created timestamp as relative date', () => {
    expect(
      screen.getByText(dayjs(impulse.createdAt).fromNow())
    ).toBeInTheDocument();
  });

  it('should render its title as heading', () => {
    expect(
      screen.getByRole('heading', { name: impulse.title })
    ).toBeInTheDocument();
  });

  it('should render its relevance as text', () => {
    expect(screen.getByText(`${impulse.relevance}%`)).toBeInTheDocument();
  });

  it('should render a link to the content page', () => {
    expect(screen.getByRole('link', { name: 'View' })).toHaveAttribute(
      'href',
      `/impulse/${impulse.id.split(':')[1]}`
    );
  });

  it('should render a support button', () => {
    expect(screen.getByRole('button', { name: 'Support' })).toBeInTheDocument();
  });

  it('should render a reply button', () => {
    expect(screen.getByRole('button', { name: 'Reply' })).toBeInTheDocument();
  });
});
