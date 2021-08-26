import { useState } from 'react';
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { BiClipboard } from 'react-icons/bi';
import FlipMove from 'react-flip-move';
import clsx from 'clsx';

import { CommonPaginationProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { TaskFragment } from 'lib/graphql';
import { IconDisplay } from 'components/common/misc';

type Props = {
  /** A list of task data */
  items: TaskFragment[];
  /** Pagination state and functionality */
  pagination?: CommonPaginationProps;
  /** Show an input field as first row to create a new task */
  showInput?: boolean;
  /** The action to execute on submit of a new task */
  onCreate?: (title: string, hideInput?: boolean) => Promise<void>;
  /** The action to execute when toggeling the completed state of a task */
  onToggle?: (complete: boolean, id: string) => Promise<void>;
  /** The action to execute on click */
  onClick?: (id: string) => void;
};

const useStyles = makeStyles(({ spacing, palette, mixins }) => ({
  listItem: {
    paddingRight: spacing(2),
    paddingLeft: spacing(6),
  },
  input: {
    height: spacing(4),
  },
  action: {
    right: 'auto',
    left: spacing(2),
  },
  checkbox: {
    color: palette.primary.main,
  },
  title: {
    ...mixins.truncateText,
  },
  completed: {
    color: palette.text.disabled,
    textDecoration: 'line-through',
  },
}));

/**
 * Renders a list of tasks and allows to add new tasks or to toggle the
 * completed status of a task.
 */
export const TaskList: React.FC<Props> = ({
  items,
  pagination,
  showInput,
  onCreate,
  onToggle,
  onClick,
}) => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState<string | boolean>(false);
  const classes = useStyles();

  const handleInputBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    if (submitting === true) return;

    setSubmitting(true);
    await onCreate?.(event.target.value, true);
    setSubmitting(false);
  };

  const handleInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (event.key !== 'Enter') return;
    if (submitting === true) return;
    event.preventDefault();
    event.stopPropagation();

    if (event.target.value) {
      setSubmitting(true);
      await onCreate?.(event.target.value);
      event.target.value = '';
      setSubmitting(false);
    } else {
      event.target.blur();
    }
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (submitting === event.target.value) return;

    setSubmitting(event.target.value);
    await onToggle?.(event.target.checked, event.target.value);
    setSubmitting(false);
  };

  return (
    <>
      <List>
        {showInput && (
          <ListItem className={classes.listItem}>
            <TextField
              fullWidth
              autoFocus
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              disabled={submitting === true}
              placeholder={t('label.newTask')}
              className={classes.input}
            />

            <ListItemSecondaryAction className={classes.action}>
              <Checkbox
                edge="start"
                color="primary"
                className={classes.checkbox}
                disabled
              />
            </ListItemSecondaryAction>
          </ListItem>
        )}

        {items.length > 0 && (
          <FlipMove appearAnimation="fade" enterAnimation="accordionVertical">
            {items.map(({ id, title, completed }) => (
              <ListItem
                button
                onClick={() => onClick?.(id)}
                className={classes.listItem}
                key={id}
              >
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{
                    color: 'textPrimary',
                    className: clsx(
                      classes.title,
                      completed && classes.completed
                    ),
                  }}
                  id={id}
                />

                <ListItemSecondaryAction className={classes.action}>
                  <Checkbox
                    edge="start"
                    color="primary"
                    value={id}
                    checked={completed}
                    onChange={handleCheckboxChange}
                    disabled={submitting === id}
                    inputProps={{ 'aria-labelledby': id }}
                    className={classes.checkbox}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </FlipMove>
        )}

        {pagination?.loading ? (
          <Box role="progressbar">
            {[0, 1, 2, 3].map((item) => (
              <ListItem
                className={classes.listItem}
                ContainerProps={{ style: { opacity: 1 - item * 0.25 } }}
                key={item}
              >
                <ListItemText primary={<Skeleton />} />
                <ListItemSecondaryAction className={classes.action}>
                  <Skeleton variant="rect" width={18} height={18} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </Box>
        ) : (
          <>
            {!items.length && !showInput && (
              <ListItem disabled>
                <Box width="100%" textAlign="center" p={2}>
                  <IconDisplay icon={BiClipboard} />
                  <Box p={1}>
                    <Typography>{t('empty.tasks')}</Typography>
                  </Box>
                </Box>
              </ListItem>
            )}

            {pagination?.hasMore && (
              <ListItem dense button onClick={pagination.fetchMore}>
                <ListItemText
                  primary={t('action.showMore')}
                  primaryTypographyProps={{
                    variant: 'button',
                    color: 'primary',
                    align: 'center',
                  }}
                />
              </ListItem>
            )}
          </>
        )}
      </List>
    </>
  );
};
