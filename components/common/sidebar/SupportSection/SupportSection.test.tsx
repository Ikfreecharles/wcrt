import {
  renderBeforeEach,
  screen,
  userEvent,
  auth,
  contentState,
  submit,
} from 'testing/util';
import { persons } from 'testing/data';
import { AgentAvatarFragment } from 'lib/graphql';

import { SupportSection } from './SupportSection';

jest.mock('hooks/profile');
jest.mock('hooks/content');
jest.mock('hooks/support');

describe('<SupportSection />', () => {
  describe('default', () => {
    renderBeforeEach(
      <SupportSection
        contentId="T:123:Article"
        supporters={persons as AgentAvatarFragment[]}
        count={123}
      />
    );

    it('should render a heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Supporters' })
      ).toBeInTheDocument();
    });

    it('should render the number of supports', () => {
      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('should render an avatar list', () => {
      expect(screen.getAllByRole('img')).toHaveLength(persons.length);
    });

    describe('authenticated', () => {
      beforeAll(() => {
        auth.session = auth.getActiveSession();
      });

      it('should render a support button', () => {
        expect(
          screen.getByRole('button', { name: 'Support' })
        ).toBeInTheDocument();
      });

      it('should trigger the support action on click', () => {
        userEvent.click(screen.getByRole('button', { name: 'Support' }));
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submit).toHaveBeenCalledWith('support', 'T:123:Article');
      });

      describe('supported', () => {
        beforeAll(() => {
          contentState.supported = true;
        });

        it('should render an unsupport button', () => {
          expect(
            screen.getByRole('button', { name: 'Stop supporting' })
          ).toBeInTheDocument();
        });

        it('should trigger the unsupport action on click', () => {
          userEvent.click(
            screen.getByRole('button', { name: 'Stop supporting' })
          );
          expect(submit).toHaveBeenCalledTimes(1);
          expect(submit).toHaveBeenCalledWith('unsupport', 'T:123:Article');
        });
      });
    });
  });

  describe('empty', () => {
    renderBeforeEach(
      <SupportSection contentId="T:123:Article" supporters={[]} count={0} />
    );

    it('should render an empty state', () => {
      expect(screen.getByText('No supporters yet')).toBeInTheDocument();
    });
  });
});
