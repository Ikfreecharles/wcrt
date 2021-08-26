import { useState } from 'react';
import { Box, Typography, SwipeableDrawer, Container } from '@material-ui/core';
import { IconType } from 'react-icons';

import { IconButton } from 'components/common/control';

type Props = {
  /** The title of the sidebar */
  title: string;
  /** The preview icon */
  icon: IconType;
  /** The preview label */
  label: string;
  /** Hide the sidebar content behind a drawer and show a preview button */
  modal?: boolean;
};

/**
 * Wraps sidebar content and implements a hybrid layout. Renders a preview label
 * and button to open a drawer when in modal mode.
 */
export const SidebarWrapper: React.FC<Props> = ({
  title,
  label,
  icon,
  modal,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return modal ? (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={-2}
    >
      <Typography variant="subtitle2" color="textSecondary">
        {label}
      </Typography>

      <IconButton
        title={title}
        icon={icon}
        edge="end"
        onClick={handleModalOpen}
        aria-haspopup="true"
      />

      <SwipeableDrawer
        anchor="right"
        open={modalOpen}
        onOpen={handleModalOpen}
        onClose={handleModalClose}
        disableDiscovery
        PaperProps={{
          role: 'dialog',
          'aria-label': title,
        }}
      >
        <Box py={2}>
          <Container>
            <>{children}</>
          </Container>
        </Box>
      </SwipeableDrawer>
    </Box>
  ) : (
    <>{children}</>
  );
};
