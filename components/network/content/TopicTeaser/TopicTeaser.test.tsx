import dayjs from 'dayjs';

import { renderBeforeEach, screen } from 'testing/util';
import { topic } from 'testing/data';

import { TopicTeaser } from './TopicTeaser';

describe('<TopicTeaser />', () => {
  renderBeforeEach(<TopicTeaser data={topic as any} />);

  it('should render its content type', () => {
    expect(screen.getByText('Topic')).toBeInTheDocument();
  });

  it('should render its updated timestamp as relative date', () => {
    expect(
      screen.getByText(`updated ${dayjs(topic.updatedAt).fromNow()}`)
    ).toBeInTheDocument();
  });

  it('should render its title as heading', () => {
    expect(
      screen.getByRole('heading', { name: topic.title })
    ).toBeInTheDocument();
  });

  it('should render its image', () => {
    expect(
      screen.getByRole('img', { name: 'Topic image' })
    ).toBeInTheDocument();
  });

  it('should render its author information', () => {
    expect(screen.getByText(topic.createdByGroup!.name)).toBeInTheDocument();
    expect(screen.getByText(topic.createdByGroup!.info!)).toBeInTheDocument();
  });

  it('should render a link to the content page', () => {
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute(
      'href',
      `/topic/${topic.id.split(':')[1]}`
    );
  });
});
