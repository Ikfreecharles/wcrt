import dayjs from 'dayjs';

import { auth, renderBeforeEach, screen, userEvent, t } from 'testing/util';
import { impulse } from 'testing/data';

import { Impulse } from './Impulse';

jest.mock('hooks/profile');

describe('<Impulse />', () => {
  renderBeforeEach(<Impulse data={impulse as any} />);

  it('should render its content type', () => {
    expect(screen.getByText('Impulse')).toBeInTheDocument();
  });

  it('should render its created timestamp as relative date', () => {
    expect(
      screen.getByText(dayjs(impulse.createdAt).fromNow(), {
        selector: 'header *',
      })
    ).toBeInTheDocument();
  });

  it('should render its title as heading', () => {
    expect(
      screen.getByRole('heading', { name: impulse.title })
    ).toBeInTheDocument();
  });

  it('should render its intro text', () => {
    expect(screen.getByText(impulse.intro!)).toBeInTheDocument();
  });

  it('should render its images', () => {
    expect(screen.getAllByRole('img', { name: 'Impulse image' })).toHaveLength(
      impulse.imagedBy.edges.length
    );
  });

  it('should render its translated categories', () => {
    impulse.categorizedBy.edges.forEach(({ node: category }) => {
      expect(
        screen.getByText(t(`content.category.${category.name}`))
      ).toBeInTheDocument();
    });
  });

  it('should render its location', () => {
    expect(
      screen.getByText(
        `${impulse.locatedByAddress!.addressLocality}, ${
          impulse.locatedByAddress!.addressCountry
        }`
      )
    ).toBeInTheDocument();
  });

  it('should render a share button', () => {
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });

  it('should render the group answer section', () => {
    expect(
      screen.getByRole('heading', { name: 'Group foundations' })
    ).toBeInTheDocument();
  });

  it('should render the comment answer section', () => {
    expect(
      screen.getByRole('heading', { name: 'Replies' })
    ).toBeInTheDocument();
  });

  it('should render a reply button', () => {
    expect(screen.getByRole('button', { name: 'Reply' })).toBeInTheDocument();
  });

  it('should render an implemention button', () => {
    expect(
      screen.getByRole('button', { name: 'Implement an idea' })
    ).toBeInTheDocument();
  });

  describe('unauthenticated', () => {
    it('should trigger the sign-in process on reply button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Reply' }));
      expect(auth.signIn).toHaveBeenCalledTimes(1);
    });
  });

  describe('authenticated', () => {
    beforeAll(() => {
      auth.session = auth.getActiveSession();
    });

    it('should open a dialog on reply button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Reply' }));
      expect(screen.getByRole('dialog', { name: 'Reply' })).toBeInTheDocument();
    });
  });
});
