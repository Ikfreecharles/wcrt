import {
  renderBeforeEach,
  screen,
  userEvent,
  auth,
  contentState,
  submit,
} from 'testing/util';

import { ContentReactions } from './ContentReactions';

jest.mock('hooks/profile');
jest.mock('hooks/content');
jest.mock('hooks/support');

describe('<ContentReactions />', () => {
  renderBeforeEach(
    <ContentReactions id="T:123:Article" supportCount={16} commentCount={4} />
  );

  it('should render the number of supports as support button', () => {
    expect(screen.getByRole('button', { name: 'Support' })).toHaveTextContent(
      '16'
    );
  });

  it('should render the number of comments as reply button', () => {
    expect(screen.getByRole('button', { name: 'Reply' })).toHaveTextContent(
      '4'
    );
  });

  describe('authenticated', () => {
    beforeAll(() => {
      auth.session = auth.getActiveSession();
    });

    it('should render the support button as inactive', () => {
      expect(screen.getByRole('button', { name: 'Support' })).toHaveAttribute(
        'aria-pressed',
        'false'
      );
    });

    it('should trigger a support on support button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Support' }));
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('support', 'T:123:Article');
    });

    describe('supported', () => {
      beforeAll(() => {
        contentState.supported = true;
      });

      it('should render the support button as active', () => {
        expect(screen.getByRole('button', { name: 'Support' })).toHaveAttribute(
          'aria-pressed',
          'true'
        );
      });

      it('should trigger an unsupport on support button click', () => {
        userEvent.click(screen.getByRole('button', { name: 'Support' }));
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submit).toHaveBeenCalledWith('unsupport', 'T:123:Article');
      });
    });
  });
});
