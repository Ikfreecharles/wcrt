import { auth, messaging, renderBeforeEach } from 'testing/util';
import { accessTokenVar } from 'lib/variables';

import { DataProvider } from './DataProvider';

jest.mock('hooks/messaging');

jest.unmock('@apollo/client');

describe('<DataProvider />', () => {
  renderBeforeEach(<DataProvider />);

  it('should reset the access token', () => {
    expect(accessTokenVar()).toBe(null);
  });

  describe('authenticated', () => {
    beforeAll(() => {
      auth.session = auth.getActiveSession();
    });

    it('should update the access token', () => {
      expect(accessTokenVar()).toBe('xyz');
    });

    it('should initialize the messaging stream', () => {
      expect(messaging.init).toHaveBeenCalledTimes(1);
    });
  });
});
