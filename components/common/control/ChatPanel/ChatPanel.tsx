import { useForm } from 'react-hook-form';
import {
  Fab,
  makeStyles,
  SvgIcon,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { BiSend } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { useMessaging } from 'hooks/messaging';
import { WindowFooter } from 'components/common/misc';

type Props = {
  /** The ID of the target chat channel */
  channelId: string;
};

const useStyles = makeStyles(({ spacing }) => ({
  input: {
    borderRadius: spacing(2.5),
  },
}));

/**
 * Renders tools for writing and submitting new chat messages. Meant to be used
 * within a chat window.
 */
export const ChatPanel: React.FC<Props> = ({ channelId }) => {
  const { t } = useTranslation();
  const { sendMessage } = useMessaging(channelId);
  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
  });
  const classes = useStyles();

  const onSubmit = async ({ content }: { content: string }) => {
    const success = !!(await sendMessage(content));
    if (success) reset({ content: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WindowFooter
        leadingElement={
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder={t('action.typeMessage')}
            inputProps={{
              ...register('content', { required: true }),
              'aria-label': t('action.typeMessage'),
            }}
            InputProps={{ className: classes.input }}
          />
        }
      >
        <Tooltip title={t('action.sendMessage')!}>
          <span>
            <Fab
              size="small"
              color="secondary"
              disabled={!formState.isValid || formState.isSubmitting}
              type="submit"
              aria-label={t('action.sendMessage')}
            >
              <SvgIcon component={BiSend} />
            </Fab>
          </span>
        </Tooltip>
      </WindowFooter>
    </form>
  );
};
