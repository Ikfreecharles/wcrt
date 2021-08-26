import { useState, useRef, RefObject } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Typography,
  Card,
  Tabs,
  TabsActions,
  Tab,
  Button,
  makeStyles,
} from '@material-ui/core';
import { BiBell, BiPulse, BiGroup, BiMap } from 'react-icons/bi';

import { CommonPaginationProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { ContentTeaserFragment, PersonProfileFragment } from 'lib/graphql';
import { useColumnQuery, usePageTransitionCallback } from 'hooks/layout';
import {
  Feature,
  TabPanel,
  Well,
  IconWrapper,
  Alert,
} from 'components/common/misc';
import { IconButton } from 'components/common/control';
import { Feed } from 'components/common/data';
import { TextFormatter } from 'components/common/media';
import { Avatar } from 'components/network/profile';

type Props = {
  /** Raw GraphQL data */
  data: PersonProfileFragment;
  /** Pagination for the person’s contents */
  contentPagination?: CommonPaginationProps;
  /** Pagination for the person’s comments */
  commentPagination?: CommonPaginationProps;
  /** Pagination for the person’s supports */
  ratingPagination?: CommonPaginationProps;
};

const useStyles = makeStyles(
  ({ spacing, palette, shadows, breakpoints, mixins }) => ({
    root: {
      position: 'relative',
      paddingTop: spacing(10),
    },
    topActions: {
      position: 'absolute',
      right: 0,
      top: spacing(-1.5),
      display: 'flex',
      alignItems: 'center',
      height: spacing(6),
    },
    card: {
      position: 'relative',
      marginBottom: spacing(2),
      overflow: 'visible',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      [breakpoints.up('sm')]: {
        flexDirection: 'row',
      },
    },
    avatar: {
      boxSizing: 'content-box',
      marginTop: spacing(-10 - 3 - 0.5),
      marginBottom: spacing(3),
      border: `${spacing(0.5)}px solid ${palette.background.paper}`,
      boxShadow: shadows[3],
      [breakpoints.up('sm')]: {
        marginBottom: 0,
        marginRight: spacing(2),
      },
    },
    headerText: {
      [breakpoints.up('sm')]: {
        ...mixins.truncateText,
      },
    },
  })
);

/**
 * Renders a full person profile view with all of the persons’s meta data and
 * contents. Meant to be used on the persons’s public profile page.
 */
export const PersonProfile: React.FC<Props> = ({
  data,
  contentPagination,
  commentPagination,
  ratingPagination,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [previousTab, setPreviousTab] = useState<number>();
  const extendedView = useColumnQuery('sm');
  const tabsActions = useRef<TabsActions>() as RefObject<TabsActions>;
  const classes = useStyles();

  usePageTransitionCallback(() => tabsActions.current?.updateIndicator());

  const handleTabChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setPreviousTab(activeTab);
    setActiveTab(newValue);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.topActions}>
        {data._permissions?.update ? (
          <NextLink href="/personal/data" passHref>
            <Button>{t('action.edit')}</Button>
          </NextLink>
        ) : (
          <Feature flag="showSubscribeButton">
            <IconButton
              title={t('action.subscribe')}
              icon={BiBell}
              edge="end"
            />
          </Feature>
        )}
      </Box>

      <Card className={classes.card}>
        <Box p={3}>
          <Box className={classes.header}>
            <Avatar size="extra" data={data} className={classes.avatar} />

            <Box className={classes.headerText}>
              <Typography component="h1" variant="h4">
                {data.name}
              </Typography>

              <Typography component="p" variant="body1">
                {data.info}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" mt={3}>
            <Well vertical={!extendedView}>
              <IconWrapper icon={BiPulse} title={t('label.activity')}>
                <Typography component="span" variant="subtitle2">
                  {t('count.contribution', {
                    count:
                      data.createsContent.count +
                      data.createsComment.count +
                      data.createsRating.count,
                  })}
                </Typography>
              </IconWrapper>

              <IconWrapper icon={BiGroup} title={t('label.participation')}>
                <Typography component="span" variant="subtitle2">
                  {t('count.group', {
                    count: data.representedBy?.ownsMembership.count || 0,
                  })}
                </Typography>
              </IconWrapper>

              {data.locatedByAddress && (
                <IconWrapper icon={BiMap} title={t('label.location')}>
                  <Typography component="span" variant="subtitle2">
                    {data.locatedByAddress.addressLocality}
                  </Typography>
                </IconWrapper>
              )}
            </Well>
          </Box>

          {data.intro && (
            <Box mt={3}>
              <Typography component="p" variant="body1">
                <TextFormatter autoLink>{data.intro}</TextFormatter>
              </Typography>
            </Box>
          )}
        </Box>

        <Tabs
          centered={extendedView}
          variant={extendedView ? 'standard' : 'scrollable'}
          textColor="primary"
          indicatorColor="primary"
          value={activeTab}
          onChange={handleTabChange}
          action={tabsActions}
        >
          <Tab label={t('label.impulses')} />
          <Tab label={t('label.replies')} />
          <Tab label={t('label.supports')} />
        </Tabs>
      </Card>

      <TabPanel index={0} activeTab={activeTab} previousTab={previousTab}>
        <Feed
          items={data.createsContent.edges.map((item) => item.node)}
          pagination={contentPagination}
          emptyState={
            <Alert
              type="comeBackLater"
              title={t('empty.profile.impulses', { name: data.name })}
            />
          }
        />
      </TabPanel>

      <TabPanel index={1} activeTab={activeTab} previousTab={previousTab}>
        <Feed
          items={data.createsComment.edges.map((item) => item.node)}
          pagination={commentPagination}
          emptyState={
            <Alert
              type="comeBackLater"
              title={t('empty.profile.replies', { name: data.name })}
            />
          }
        />
      </TabPanel>

      <TabPanel index={2} activeTab={activeTab} previousTab={previousTab}>
        <Feed
          items={data.createsRating.edges
            .map((item) =>
              item.node.__typename === 'ContentRating' ? item.node.rates : null
            )
            .filter((item): item is ContentTeaserFragment => !!item)}
          pagination={ratingPagination}
          emptyState={
            <Alert
              type="comeBackLater"
              title={t('empty.profile.supports', { name: data.name })}
            />
          }
        />
      </TabPanel>
    </Box>
  );
};
