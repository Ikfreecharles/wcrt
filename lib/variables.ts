import { makeVar } from '@apollo/client';

import { Settings } from 'types';

/** A reactive variable to globally share the access token. */
export const accessTokenVar = makeVar<string | null>(null);

/** A reactive variable to globally share the interface preferances. */
export const settingsVar = makeVar<Omit<Settings, 'language'>>({
  paletteType: 'light',
  headerState: 'expanded',
});
