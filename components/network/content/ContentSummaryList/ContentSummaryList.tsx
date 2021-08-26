import { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Typography,
  ButtonBase,
  Tooltip,
  List,
  ListItem,
  Divider,
  SvgIcon,
  makeStyles,
} from '@material-ui/core';
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';
import { ContentSummaryFragment } from 'lib/graphql';
import { getEntityPath } from 'util/url';
import { ContentSummary } from 'components/network/content';

type Props = {
  /** A list of content element data */
  contents: ContentSummaryFragment[];
  /** Display preview images */
  extended?: boolean;
  /** The horizontal gutter of the list */
  indent?: number;
};

type StyleProps = Required<Pick<Props, 'indent'>>;

const useStyles = makeStyles(({ spacing }) => ({
  list: {
    marginBottom: spacing(-2),
  },
  header: ({ indent }: StyleProps) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing(0, indent),
  }),
  item: ({ indent }: StyleProps) => ({
    display: 'block',
    padding: spacing(2, indent),
  }),
  divider: ({ indent }: StyleProps) => ({
    margin: spacing(0, indent),
  }),
  dividerInset: ({ indent }: StyleProps) => ({
    marginLeft: spacing(indent + 16 + 2.5),
  }),
}));

/**
 * Renders a collection of content elements in a compact manner and allows to
 * customize the sorting method. Meant to be used on the topic page.
 */
export const ContentSummaryList: React.FC<Props> = ({
  contents,
  extended,
  indent = 2,
}) => {
  const [sortAsc, setSortAsc] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles({ indent });

  const sortedContents = [...contents].sort((a, b) => {
    const compare = a.createdAt.getTime() - b.createdAt.getTime();
    return sortAsc ? compare : -compare;
  });

  const handleClick = () => setSortAsc((prevState) => !prevState);

  return (
    <>
      <Box className={classes.header}>
        <Typography component="h2" variant="subtitle2" color="textSecondary">
          {t('count.content', { count: contents.length })}
        </Typography>

        <ButtonBase onClick={handleClick}>
          <Typography component="span" variant="body2">
            {t('sort.date')}
          </Typography>

          <Tooltip
            title={sortAsc ? t('label.ascending')! : t('label.descending')!}
          >
            <Box role="img">
              <SvgIcon component={sortAsc ? BiUpArrowAlt : BiDownArrowAlt} />
            </Box>
          </Tooltip>
        </ButtonBase>
      </Box>

      <List component="ol" disablePadding className={classes.list}>
        {sortedContents.map((item, index) => (
          <Box component="li" key={index}>
            <NextLink href={getEntityPath(item.id)}>
              <ListItem button className={classes.item}>
                <ContentSummary data={item} extended={extended} />
              </ListItem>
            </NextLink>

            {index + 1 < contents.length && (
              <Divider
                className={clsx(
                  classes.divider,
                  extended && classes.dividerInset
                )}
              />
            )}
          </Box>
        ))}
      </List>
    </>
  );
};
