import { GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
import { Box, Typography, Button, Card } from '@material-ui/core';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import { useTranslation } from 'lib/i18n';
import { PageTransition } from 'components/common/page';
import { Illustration } from 'components/common/media';

const NotFoundPage: NextPage<CommonPageProps> = () => {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo
        title={t('page.404.title')}
        openGraph={{
          title: t('page.404.title'),
        }}
      />

      <PageTransition>
        <Card>
          <Illustration name="error" />

          <Box p={3} pb={6} textAlign="center">
            <Typography component="h1" variant="h4" gutterBottom>
              {t('page.404.title')}
            </Typography>

            <Typography paragraph>{t('page.404.body')}</Typography>

            <NextLink href="/" passHref>
              <Button variant="contained">{t('action.backToStart')}</Button>
            </NextLink>
          </Box>
        </Card>
      </PageTransition>
    </>
  );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps = (ctx) =>
  initializePageData(ctx, ['common']);
