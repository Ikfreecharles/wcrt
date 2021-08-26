import { useContext } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
  List,
  ListItem,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { BiSearch } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { GroupContext } from 'context/group';
import { useRelativeNavigation } from 'hooks/navigation';
import { useAccountSearch } from 'hooks/search';
import { useMembershipInvite } from 'hooks/membership';
import { Signature } from 'components/network/profile';
import { Alert, InlineProgress } from 'components/common/misc';
import { GroupWindow } from 'components/group/misc';

/**
 * Renders a form to add new members to the group. Meant to be used within a
 * group context.
 */
export const GroupMembersAdd: React.FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { navigateBack } = useRelativeNavigation();
  const { groupId } = useContext(GroupContext);
  const createMembershipInvite = useMembershipInvite(groupId);
  const { searchValue, handleSearch, loading, results } = useAccountSearch();

  const handleMemberAdd = (onlineAccountId: string) => async () => {
    try {
      await createMembershipInvite(onlineAccountId);
      enqueueSnackbar(t('group:notice.inviteSent'));
      navigateBack();
    } catch {
      enqueueSnackbar(t('group:notice.inviteNotSent'), { variant: 'error' });
    }
  };

  return (
    <GroupWindow title={t('group:action.addMembers')}>
      <TextField
        fullWidth
        hiddenLabel
        variant="outlined"
        placeholder={t('action.searchForPersons')}
        value={searchValue}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon component={BiSearch} color="action" />
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <InlineProgress />
      ) : results.length ? (
        <Box mx={-2}>
          <List>
            {results.map((item) => (
              <ListItem key={item.id}>
                <Signature data={item.represents} />

                <ListItemSecondaryAction>
                  <Button color="primary" onClick={handleMemberAdd(item.id)}>
                    {t('action.invite')}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        searchValue.length >= 2 && (
          <Alert type="notFound" message={t('explain.personSearchEmpty')} />
        )
      )}
    </GroupWindow>
  );
};
