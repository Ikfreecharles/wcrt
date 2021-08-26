import { useRouter } from 'next/router';
import { Box, Fade } from '@material-ui/core';

import { useSession } from 'lib/auth';
import { useSettings } from 'hooks/settings';
import { comparePaths } from 'util/url';
import { CreateButton } from 'components/common/control';

type Props = {
  /** Custom styles */
  className?: string;
};

/**
 * Wraps the create button with a transition component to toggle its visibility
 * depending on the header state. Meant to be used within the mobile layout.
 */
export const MobileCreateButton: React.FC<Props> = ({ className }) => {
  const [session] = useSession();
  const [{ headerState }] = useSettings();
  const { pathname } = useRouter();

  const isVisible =
    (session || headerState === 'collapsed') && comparePaths(pathname, ['/']);

  return (
    <Fade in={isVisible}>
      <Box>
        <CreateButton className={className} />
      </Box>
    </Fade>
  );
};
