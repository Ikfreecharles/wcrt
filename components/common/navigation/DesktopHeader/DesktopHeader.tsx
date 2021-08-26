import { Box, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import { BiSearch } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { useSession } from 'lib/auth';
import { Feature } from 'components/common/misc';
import { AccountMenu } from 'components/common/navigation';
import {
  FeedbackButton,
  LoginButton,
  DarkModeToggle,
  LanguageSelect,
} from 'components/common/control';

/** Renders globally visible elements for large screens. Meant to be used within a sidebar. */
export const DesktopHeader: React.FC = () => {
  const { t } = useTranslation();
  const [session] = useSession();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={-1.5}
        mb={1}
        data-testid="desktop"
      >
        <LanguageSelect />

        <Box display="flex" alignItems="center">
          {session ? (
            <>
              <FeedbackButton />
              <AccountMenu />
            </>
          ) : (
            <>
              <LoginButton />
              <DarkModeToggle />
            </>
          )}
        </Box>
      </Box>

      <Feature flag="showGlobalSearchInput" placeholder={<Box mb={4} />}>
        <Box mb={4}>
          <TextField
            fullWidth
            hiddenLabel
            variant="filled"
            placeholder={t('label.search')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon component={BiSearch} color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Feature>
    </>
  );
};
