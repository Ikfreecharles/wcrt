import { renderBeforeEach, screen } from 'testing/util';
import { person, persons, comments, topics } from 'testing/data';
import {
  AgentAvatarFragment,
  CommentFragment,
  TopicTeaserFragment,
} from 'lib/graphql';

import { ContentSidebar } from './ContentSidebar';

describe('<ContentSidebar />', () => {
  describe('default', () => {
    renderBeforeEach(
      <ContentSidebar
        id="T:123:Article"
        supporters={persons as AgentAvatarFragment[]}
        comments={comments as CommentFragment[]}
        relatedTopics={topics as TopicTeaserFragment[]}
      />
    );

    it('should render the support section', () => {
      expect(
        screen.getByRole('heading', { name: 'Supporters' })
      ).toBeInTheDocument();
    });

    it('should render the comment section', () => {
      expect(
        screen.getByRole('heading', { name: 'Replies' })
      ).toBeInTheDocument();
    });

    it('should render the topic section', () => {
      expect(
        screen.getByRole('heading', { name: 'Related topics' })
      ).toBeInTheDocument();
    });
  });

  describe('empty', () => {
    renderBeforeEach(
      <ContentSidebar
        id="T:123:Article"
        supporters={[]}
        comments={[]}
        relatedTopics={[]}
      />
    );

    it('should not render the topic section', () => {
      expect(
        screen.queryByRole('heading', { name: 'Related topics' })
      ).not.toBeInTheDocument();
    });
  });

  describe('impulse', () => {
    renderBeforeEach(
      <ContentSidebar
        id="T:123:Impulse"
        relevance={99}
        impulseAuthor={person}
      />
    );

    it('should render the relevance section', () => {
      expect(
        screen.getByRole('heading', { name: 'Relevance' })
      ).toBeInTheDocument();
      expect(screen.getByText('99%')).toBeInTheDocument();
      expect(
        screen.getByText(/The relevance of an impulse/)
      ).toBeInTheDocument();
    });

    it('should render the author section', () => {
      expect(
        screen.getByRole('heading', { name: 'Impulse creator' })
      ).toBeInTheDocument();
      expect(screen.getByText(person.name)).toBeInTheDocument();
      expect(screen.getByText(person.info!)).toBeInTheDocument();
    });
  });
});
