import { Meta } from '@storybook/react/types-6-0';

import { MobileHeader } from './MobileHeader';

export default {
  title: 'Primary/MobileHeader',
} as Meta;

export const Default = () => <MobileHeader />;

export const Elevated = () => <MobileHeader elevated />;
