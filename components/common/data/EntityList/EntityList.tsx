import { useState } from 'react';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import {
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { BiEdit, BiTrash, BiCheck, BiX } from 'react-icons/bi';

import { CommonPaginationProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useEntityDelete } from 'hooks/entity';
import { ConditionalWrapper } from 'components/common/misc';
import { IconButton } from 'components/common/control';
import { EntityEditDialog } from 'components/common/dialog';

type Props = {
  /** Display an entity edit button */
  editable?: boolean;
  /** Display an entity delete button */
  deletable?: boolean;
  /** A function to render custom actions instead of edit or delete */
  createCustomAction?: (id: string) => React.ReactNode;
  /** A list of entity data */
  items: {
    id: string;
    leadingElement?: React.ReactNode;
    title?: string;
    subtitle?: string;
    url?: string;
  }[];
  /** Pagination state and functionality */
  pagination?: CommonPaginationProps;
  /** Shows skeleton elements instead of a progress bar as loading state */
  loadingSkeleton?: boolean;
};

const useStyles = makeStyles(({ spacing }) => ({
  listItem: {
    minHeight: spacing(7),
  },
}));

/**
 * Wraps common used list elements used to display large quantities of entity
 * data. Optionally includes pagination and functionality to edit or delete
 * specific entries.
 */
export const EntityList: React.FC<Props> = ({
  editable,
  deletable,
  createCustomAction,
  items,
  pagination,
  loadingSkeleton,
}) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string>();
  const [deletingId, setDeletingId] = useState<string>();
  const deleteEntity = useEntityDelete();
  const classes = useStyles();

  const handleEdit = (id: string) => () => {
    setEditingId(id);
    setEditing(true);
  };

  const handleDeleteClick = async () => {
    if (!deletingId) return;
    await deleteEntity(deletingId);
    enqueueSnackbar(t('notice.contentDeleted'));
  };

  return (
    <>
      <List disablePadding>
        {items.map(({ id, leadingElement, title, subtitle, url }, index) => (
          <ConditionalWrapper
            condition={!!url}
            wrap={(children) => (
              <NextLink href={url!} passHref>
                <ListItem
                  component="a"
                  button
                  dense
                  divider={index < items.length - 1}
                  className={classes.listItem}
                >
                  {children}
                </ListItem>
              </NextLink>
            )}
            alternative={(children) => (
              <ListItem
                dense
                divider={index < items.length - 1}
                className={classes.listItem}
              >
                {children}
              </ListItem>
            )}
            key={id}
          >
            {leadingElement}

            <ListItemText
              primary={title}
              secondary={subtitle}
              primaryTypographyProps={{
                variant: 'body2',
                color: 'textPrimary',
              }}
            />

            <ListItemSecondaryAction>
              <Box display="flex">
                {createCustomAction?.(id) ||
                  (deletingId === id ? (
                    <>
                      <IconButton
                        title={t('action.confirm')}
                        icon={BiCheck}
                        color="primary"
                        edge="end"
                        onClick={handleDeleteClick}
                      />

                      <IconButton
                        title={t('action.cancel')}
                        icon={BiX}
                        edge="end"
                        onClick={() => setDeletingId(undefined)}
                      />
                    </>
                  ) : (
                    <>
                      {editable && (
                        <IconButton
                          title={t('action.edit')}
                          icon={BiEdit}
                          color="primary"
                          edge="end"
                          onClick={handleEdit(id)}
                        />
                      )}

                      {deletable && (
                        <IconButton
                          title={t('action.delete')}
                          icon={BiTrash}
                          color="primary"
                          edge="end"
                          onClick={() => setDeletingId(id)}
                        />
                      )}
                    </>
                  ))}
              </Box>
            </ListItemSecondaryAction>
          </ConditionalWrapper>
        ))}

        {pagination?.loading ? (
          loadingSkeleton ? (
            <Box role="progressbar">
              {[0, 1, 2, 3].map((item) => (
                <ListItem
                  className={classes.listItem}
                  ContainerProps={{ style: { opacity: 1 - item * 0.25 } }}
                  key={item}
                >
                  <ListItemText
                    primary={<Skeleton width={120} />}
                    secondary={<Skeleton width={200} />}
                  />
                  <ListItemSecondaryAction>
                    <Box
                      display="flex"
                      flexDirection="row-reverse"
                      justifyContent="space-between"
                      width={60}
                    >
                      {editable && (
                        <Skeleton variant="circle" width={24} height={24} />
                      )}

                      {deletable && (
                        <Skeleton variant="circle" width={24} height={24} />
                      )}
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </Box>
          ) : (
            <LinearProgress />
          )
        ) : (
          <>
            {!items.length && (
              <ListItem dense disabled className={classes.listItem}>
                <ListItemText
                  primary={t('empty.contents')}
                  primaryTypographyProps={{ align: 'center' }}
                />
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

      {editable && editingId && (
        <EntityEditDialog id={editingId} open={editing} setOpen={setEditing} />
      )}
    </>
  );
};
