import { Dispatch, forwardRef, SetStateAction } from 'react';
import {
  useMediaQuery,
  Box,
  Typography,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  Slide,
  AppBar,
  Toolbar,
  DialogActions,
  DialogContent,
  makeStyles,
  Theme,
  Button,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { BiX } from 'react-icons/bi';
import clsx from 'clsx';

import { CommonDialogProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useElementId } from 'hooks/helper';
import { hasProperty } from 'util/type';
import { ConditionalWrapper } from 'components/common/misc';
import { IconButton } from 'components/common/control';

type FormNavigation = {
  /** The ID of the form to navigate through */
  formId: string;
  /** The current page of the form */
  page: number;
  /** A function to handle page updates */
  setPage: Dispatch<SetStateAction<number>>;
  /** A custom label of the previous button */
  previousButtonLabel?: string;
  /** A custom label of the next button */
  nextButtonLabel?: string;
  /** Disable the navigation buttons (usually while submitting) */
  disabled?: boolean;
};

type Props = CommonDialogProps & {
  /** The title of the dialog */
  title: string;
  /** The maximum width of the dialog */
  width?: MuiDialogProps['maxWidth'];
  /** Add a padding for the dialog content */
  gutters?: boolean;
  /** Provide actions to use as a dialog footer */
  actions?: JSX.Element | FormNavigation;
};

const shouldRenderFormNavigation = (
  actions: Props['actions']
): actions is FormNavigation => hasProperty(actions, 'page');

const useStyles = makeStyles(({ spacing, palette }) => ({
  modalTitle: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: spacing(1, 2),
    borderBottom: `1px solid ${palette.divider}`,
  },
  contentGutters: {
    padding: spacing(2),
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref?: React.Ref<unknown>
) {
  return <Slide direction="up" {...props} ref={ref} />;
});

/**
 * Wraps commonly used dialog components and renders them using a transition.
 * Uses a fullscreen layout on small screens. Can provide navigation elements
 * for form components.
 */
export const Dialog: React.FC<Props> = ({
  title,
  actions,
  width = 'xs',
  gutters = true,
  open,
  setOpen,
  onExited,
  children,
}) => {
  const { t } = useTranslation();
  const titleId = useElementId('title');
  const isModal = useMediaQuery<Theme>(({ breakpoints }) =>
    breakpoints.up('sm')
  );
  const classes = useStyles();

  const handleClose = () => setOpen(false);

  return (
    <MuiDialog
      fullScreen={!isModal}
      fullWidth
      maxWidth={width}
      scroll={isModal ? 'body' : 'paper'}
      open={open}
      onClose={handleClose}
      onExited={onExited}
      TransitionComponent={Transition}
      PaperProps={{ 'aria-labelledby': titleId }}
    >
      <ConditionalWrapper
        condition={isModal}
        wrap={(children) => (
          <Box className={classes.modalTitle}>{children}</Box>
        )}
        alternative={(children) => (
          <AppBar position="sticky">
            <Toolbar>{children}</Toolbar>
          </AppBar>
        )}
      >
        <Box flex="1">
          <Typography component="h2" variant="h6" id={titleId}>
            {title}
          </Typography>
        </Box>

        <IconButton
          title={t('action.close')}
          icon={BiX}
          edge="end"
          color={!isModal ? 'inherit' : undefined}
          onClick={handleClose}
        />
      </ConditionalWrapper>

      <DialogContent className={clsx(gutters && classes.contentGutters)}>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions>
          {shouldRenderFormNavigation(actions) ? (
            actions.page === 0 ? (
              <>
                <Button color="primary" onClick={handleClose}>
                  {t('action.cancel')}
                </Button>

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  form={actions.formId}
                >
                  {t('action.start')}
                </Button>
              </>
            ) : (
              <Box flex="1" display="flex" justifyContent="space-between">
                <Button
                  color="primary"
                  onClick={() => actions.setPage(actions.page - 1)}
                  disabled={actions.disabled}
                >
                  {actions.previousButtonLabel || t('action.previous')}
                </Button>

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  form={actions.formId}
                  disabled={actions.disabled}
                >
                  {actions.nextButtonLabel || t('action.next')}
                </Button>
              </Box>
            )
          ) : (
            actions
          )}
        </DialogActions>
      )}
    </MuiDialog>
  );
};
