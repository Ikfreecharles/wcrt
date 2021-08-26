import { Theme, useMediaQuery } from '@material-ui/core';

import { PageLayout } from 'types';
import { DesktopLayout, MobileLayout } from 'components/common/misc';

type Props = {
  /** Hide branding and navigation elements */
  embedded?: boolean;
  /** Page-specific layout elements */
  pageLayout?: PageLayout;
};

/** Decides which global layout component to use. */
export const Layout: React.FC<Props> = ({ children, ...props }) => {
  const isDesktop = useMediaQuery<Theme>(({ breakpoints }) =>
    breakpoints.up('md')
  );

  return isDesktop ? (
    <DesktopLayout {...props}>{children}</DesktopLayout>
  ) : (
    <MobileLayout {...props}>{children}</MobileLayout>
  );
};
