import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Grid } from '@material-ui/core';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import { useTranslation } from 'lib/i18n';
import { useMyAccountInfoQuery } from 'lib/graphql';
import { useUnauthenticatedRedirect } from 'hooks/init';
import { PageTransition, PageHeader } from 'components/common/page';
import {
  AccordionDisplay,
  AccordionForm,
  AccordionList,
} from 'components/common/control';
import {
  AccountContactForm,
  AccountPasswordForm,
  ProfileForm,
} from 'components/common/form';
import {
  AccountCommentList,
  AccountImpulseList,
  AccountRatingList,
  AccountMembershipList,
  AccountMembershipInviteList,
  AccountMembershipRequestList,
} from 'components/common/data';

const PersonalDataPage: NextPage<CommonPageProps> = () => {
  const { t } = useTranslation();
  const { data } = useMyAccountInfoQuery();
  const [expanded, setExpanded] = useState<number>();

  const getAccordionToggle = (id: number) => () =>
    setExpanded((prevState) => (prevState === id ? undefined : id));

  if (useUnauthenticatedRedirect('/personal')) return null;

  return (
    <>
      <NextSeo title={t('label.personalData')} />

      <PageTransition>
        <PageHeader
          title={t('label.personalData')}
          caption={t('explain.personalData.intro')}
        />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AccordionForm
              title={t('label.profile')}
              preview={data?.me.represents?.name}
              Form={ProfileForm}
              expanded={expanded === 1}
              toggle={getAccordionToggle(1)}
            />

            <AccordionForm
              title={t('label.contact')}
              preview={data?.me.email}
              Form={AccountContactForm}
              expanded={expanded === 2}
              toggle={getAccordionToggle(2)}
            />

            <AccordionForm
              title={t('label.password')}
              preview={data ? '••••••••••••••••' : undefined}
              Form={AccountPasswordForm}
              expanded={expanded === 3}
              toggle={getAccordionToggle(3)}
            />

            <AccordionDisplay
              title={t('label.registeredSince')}
              preview={
                data
                  ? t('format.dateTime', {
                      date: data?.me.createdAt,
                    })
                  : undefined
              }
            />
          </Grid>

          <Grid item xs={12}>
            <AccordionList
              title={t('label.impulsesCreated')}
              preview={data?.me.represents?.createsImpulse.count}
              description={t('explain.personalData.impulses')}
              List={AccountImpulseList}
              expanded={expanded === 5}
              toggle={getAccordionToggle(5)}
            />

            <AccordionList
              title={t('label.repliesWritten')}
              preview={data?.me.represents?.createsComment.count}
              description={t('explain.personalData.replies')}
              List={AccountCommentList}
              expanded={expanded === 6}
              toggle={getAccordionToggle(6)}
            />

            <AccordionList
              title={t('label.supportsGiven')}
              preview={data?.me.represents?.createsRating.count}
              description={t('explain.personalData.supports')}
              List={AccountRatingList}
              expanded={expanded === 7}
              toggle={getAccordionToggle(7)}
            />
          </Grid>

          <Grid item xs={12}>
            <AccordionList
              title={t('label.groupMemberships')}
              preview={data?.me.ownsMembership.count}
              description={t('explain.personalData.memberships')}
              List={AccountMembershipList}
              expanded={expanded === 8}
              toggle={getAccordionToggle(8)}
            />

            <AccordionList
              title={t('label.membershipInvites')}
              preview={data?.me.receives.count}
              description={t('explain.personalData.membershipInvites')}
              List={AccountMembershipInviteList}
              expanded={expanded === 9}
              toggle={getAccordionToggle(9)}
            />

            <AccordionList
              title={t('label.pendingMembershipRequests')}
              preview={data?.me.ownsMembershipRequest.count}
              description={t('explain.personalData.membershipRequests')}
              List={AccountMembershipRequestList}
              expanded={expanded === 10}
              toggle={getAccordionToggle(10)}
            />
          </Grid>
        </Grid>
      </PageTransition>
    </>
  );
};

export default PersonalDataPage;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common']);
