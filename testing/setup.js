import {
  auth,
  settings,
  contentState,
  apollo,
  fetchData,
  groupContext,
} from './util';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(fetchData),
  })
);

delete window.location;
window.location = new URL('https://example.com/');
window.location.assign = jest.fn();
window.location.replace = jest.fn();
window.location.reload = jest.fn();

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

afterAll(() => {
  auth.session = null;

  settings.state = {
    language: 'en',
    paletteType: 'dark',
  };

  contentState.subscribed = false;
  contentState.supported = false;
  contentState.commented = false;

  groupContext.viewerRole = 'member';

  apollo.response = undefined;
});
