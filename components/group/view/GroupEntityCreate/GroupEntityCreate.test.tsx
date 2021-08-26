import {
  renderBeforeEach,
  screen,
  enqueueSnackbar,
  formStatus,
  routerPush,
} from 'testing/util';

import { GroupEntityCreate } from './GroupEntityCreate';

jest.mock('context/group');
jest.mock('hooks/form');

describe('<GroupEntityCreate />', () => {
  renderBeforeEach(
    <GroupEntityCreate
      title="Sample title"
      Form={() => <form id="form-123" aria-label="Sample form" />}
    />
  );

  it('should render the title as heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Sample title' })
    ).toBeInTheDocument();
  });

  it('should render the form', () => {
    expect(
      screen.getByRole('form', { name: 'Sample form' })
    ).toBeInTheDocument();
  });

  it('should render a create button', () => {
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('should render a cancel button', () => {
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  describe('completed form', () => {
    beforeAll(() => {
      formStatus.formStatus = 'completed';
    });

    it('should trigger a notification', () => {
      expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
      expect(enqueueSnackbar).toHaveBeenCalledWith('Content published.');
    });

    it('should navigate to previous page', () => {
      expect(routerPush).toHaveBeenCalledTimes(1);
    });
  });
});
