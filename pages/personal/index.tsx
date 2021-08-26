import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Box, Typography, Card, Button } from '@material-ui/core';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import { signIn } from 'lib/auth';
import { useTranslation } from 'lib/i18n';
import { useAuthenticatedRedirect } from 'hooks/init';
import { PageTransition } from 'components/common/page';
import { Illustration } from 'components/common/media';

const PersonalPage: NextPage<CommonPageProps> = () => {
  const { t } = useTranslation();

  if (useAuthenticatedRedirect('/personal/data')) return null;

  const handleClick = () => signIn();

  return (
    <>
      <NextSeo
        title={t('page.personal.title')}
        openGraph={{
          title: t('page.personal.title'),
        }}
      />

      <PageTransition>
        <Card>
          <Illustration name="personal" />

          <Box p={3} pb={6} textAlign="center">
            <Typography component="h1" variant="h4" gutterBottom>
              {t('page.personal.placeholder.title')}
            </Typography>

            <Typography paragraph>
              {t('page.personal.placeholder.body')}
            </Typography>

            <Button variant="contained" color="primary" onClick={handleClick}>
              {t('action.signIn')}
            </Button>
          </Box>
        </Card>
      </PageTransition>
    </>
  );
};

export default PersonalPage;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common']);
