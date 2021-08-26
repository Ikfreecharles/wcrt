import { useState, useRef, RefObject } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Typography,
  Card,
  Tabs,
  TabsActions,
  Tab,
  makeStyles,
  Button,
  fade,
} from '@material-ui/core';
import { BiGroup, BiHash, BiMap, BiPulse } from 'react-icons/bi';
import clsx from 'clsx';

import { CommonPaginationProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { GroupProfileFragment } from 'lib/graphql';
import { useColumnQuery, usePageTransitionCallback } from 'hooks/layout';
import { getGroupMemberAvatars } from 'util/data';
import { getEntityPath } from 'util/url';
import { TabPanel, Well, IconWrapper, Alert } from 'components/common/misc';
import { Feed } from 'components/common/data';
import { TextFormatter } from 'components/common/media';
import { Avatar, InlineAvatarList } from 'components/network/profile';

type Props = {
  /** Raw GraphQL data */
  data: GroupProfileFragment;
  /** Pagination for the group articles */
  articlePagination?: CommonPaginationProps;
};

const useStyles = makeStyles(
  ({ spacing, palette, shadows, breakpoints, mixins }) => ({
    memberHeader: {
      display: 'flex',
      alignItems: 'center',
      height: spacing(10),
    },
    dodgedMemberHeader: {
      paddingLeft: spacing(26),
      [breakpoints.up('sm')]: {
        paddingLeft: 0,
        paddingRight: spacing(26),
      },
    },
    centeredMemberList: {
      justifyContent: 'center',
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
        order: 1,
        marginBottom: 0,
        marginLeft: spacing(2),
      },
    },
    headerText: {
      [breakpoints.up('sm')]: {
        flex: '1',
        ...mixins.truncateText,
      },
    },
    impulseBanner: {
      backgroundColor: fade(
        palette.secondary.main,
        palette.action.activatedOpacity
      ),
    },
  })
);

/**
 * Renders a full group profile view with all of the groups’s meta data and
 * contents. Meant to be used on the group’s public profile page.
 */
export const GroupProfile: React.FC<Props> = ({ data, articlePagination }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [previousTab, setPreviousTab] = useState<number>();
  const isExtended = useColumnQuery('sm');
  const tabsActions = useRef<TabsActions>() as RefObject<TabsActions>;
  const classes = useStyles();

  const handleTabChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setPreviousTab(activeTab);
    setActiveTab(newValue);
  };

  usePageTransitionCallback(() => tabsActions.current?.updateIndicator());

  return (
    <Box>
      <Box
        className={clsx(
          classes.memberHeader,
          data.imagedBy && classes.dodgedMemberHeader
        )}
      >
        <InlineAvatarList
          linked
          items={getGroupMemberAvatars(data.administeredBy)}
          className={clsx(!data.imagedBy && classes.centeredMemberList)}
        />
      </Box>

      <Card className={classes.card}>
        <Box p={3}>
          <Box className={classes.header}>
            {data.imagedBy && (
              <Avatar size="extra" data={data} className={classes.avatar} />
            )}

            <Box
              textAlign={data.imagedBy ? 'left' : 'center'}
              className={classes.headerText}
            >
              <Typography component="h1" variant="h4">
                {data.name}
              </Typography>

              <Typography component="p" variant="body1">
                {data.info}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" mt={3}>
            <Well vertical={!isExtended}>
              <IconWrapper icon={BiGroup} title={t('label.persons')}>
                <Typography component="span" variant="subtitle2">
                  {t('count.member', { count: data.administeredBy.count })}
                </Typography>
              </IconWrapper>

              {data.categorizedBy && (
                <IconWrapper icon={BiHash} title={t('label.category')}>
                  <Typography component="span" variant="subtitle2">
                    {t(`content.category.${data.categorizedBy?.name}`)}
                  </Typography>
                </IconWrapper>
              )}

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

        {data.covers && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={1}
            className={classes.impulseBanner}
          >
            <IconWrapper icon={BiPulse} color="secondary">
              {t('explain.group.impulse')}
            </IconWrapper>

            <NextLink href={getEntityPath(data.covers.id)} passHref>
              <Button size="small" color="primary">
                {t('action.viewImpulse')}
              </Button>
            </NextLink>
          </Box>
        )}

        <Tabs
          centered={isExtended}
          variant={isExtended ? 'standard' : 'scrollable'}
          textColor="primary"
          indicatorColor="primary"
          value={activeTab}
          onChange={handleTabChange}
          action={tabsActions}
        >
          <Tab label={t('label.articles')} />
          <Tab label={t('label.polls')} />
          <Tab label={t('label.events')} />
        </Tabs>
      </Card>

      <TabPanel index={0} activeTab={activeTab} previousTab={previousTab}>
        <Feed
          items={data.createsArticle.edges.map((item) => item.node)}
          pagination={articlePagination}
          emptyState={
            <Alert
              type="comeBackLater"
              title={t('empty.profile.articles', { name: data.name })}
            />
          }
        />
      </TabPanel>

      <TabPanel index={1} activeTab={activeTab} previousTab={previousTab}>
        <Feed
          items={
            [
              // @todo
            ]
          }
          emptyState={
            <Alert
              type="comeBackLater"
              title={t('empty.profile.polls', { name: data.name })}
            />
          }
        />
      </TabPanel>

      <TabPanel index={2} activeTab={activeTab} previousTab={previousTab}>
        <Feed
          items={
            [
              // @todo
            ]
          }
          emptyState={
            <Alert
              type="comeBackLater"
              title={t('empty.profile.events', { name: data.name })}
            />
          }
        />
      </TabPanel>
    </Box>
  );
};
