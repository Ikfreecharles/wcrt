import { useContext } from 'react';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { CommonFormProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { GroupContext } from 'context/group';
import { useFormStatus } from 'hooks/form';
import { useElementId } from 'hooks/helper';
import { useRelativeNavigation } from 'hooks/navigation';
import { GroupWindow } from 'components/group/misc';
import { WindowFooter } from 'components/common/misc';

type Props = {
  /** The title of the form */
  title: string;
  /** The form component */
  Form: React.FC<CommonFormProps & { groupId?: string }>;
};

/** Renders a view to create new group entities. Meant to be used within a group context. */
export const GroupEntityCreate: React.FC<Props> = ({ title, Form }) => {
  const { t } = useTranslation();
  const formId = useElementId('form');
  const { navigateBack } = useRelativeNavigation();
  const { enqueueSnackbar } = useSnackbar();
  const { groupId } = useContext(GroupContext);
  const { formStatus, setFormStatus } = useFormStatus(() => {
    enqueueSnackbar(t('notice.contentPublished'));
    navigateBack();
  });

  return (
    <GroupWindow
      title={title}
      footer={
        <WindowFooter
          leadingElement={
            <Button onClick={navigateBack}>{t('action.cancel')}</Button>
          }
        >
          <Button
            type="submit"
            form={formId}
            variant="contained"
            color="primary"
            disabled={formStatus === 'submitting'}
          >
            {t('action.create')}
          </Button>
        </WindowFooter>
      }
    >
      <Form
        mode="onSubmit"
        setStatus={setFormStatus}
        id={formId}
        groupId={groupId}
      />
    </GroupWindow>
  );
};
