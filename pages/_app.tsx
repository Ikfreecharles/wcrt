import { UIDReset } from 'react-uid';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { Session } from 'next-auth/client';
import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';

import { appWithTranslation, useTranslation, i18nConfig } from 'lib/i18n';
import { AuthProvider, getSession } from 'lib/auth';
import { createTheme, generateClassName } from 'lib/theme';
import { FeatureProvider } from 'context/feature';
import { useCanonicalUrl } from 'hooks/navigation';
import { useSettings } from 'hooks/settings';
import { usePageLayout } from 'hooks/layout';
import { getFeatureFlags } from 'util/feature';
import { createAbsoluteUrl } from 'util/url';
import { isEmbedded } from 'util/env';
import { DataProvider, SnackbarProvider, Layout } from 'components/common/misc';

import 'lib/init';

type Props = {
  session?: Session | null;
  expectDesktop?: boolean;
};

const MyApp = ({
  Component,
  pageProps,
  session,
  expectDesktop,
}: AppProps & Props) => {
  const { t } = useTranslation();
  const [{ paletteType }] = useSettings();
  const [pageLayout, setPageLayout] = usePageLayout();
  const getPageUrl = useCanonicalUrl();

  return (
    <UIDReset>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={createTheme(paletteType, expectDesktop)}>
          <SnackbarProvider>
            <AuthProvider session={session}>
              <DataProvider state={pageProps.initialApolloState}>
                <FeatureProvider value={getFeatureFlags()}>
                  <Head>
                    <meta
                      name="viewport"
                      content="width=device-width, initial-scale=1, viewport-fit=cover"
                    />
                  </Head>

                  <CssBaseline />

                  <DefaultSeo
                    defaultTitle={process.env.NEXT_PUBLIC_APP_NAME}
                    titleTemplate={`%s | ${process.env.NEXT_PUBLIC_APP_NAME}`}
                    description={t('meta.description')}
                    canonical={getPageUrl()}
                    languageAlternates={i18nConfig.i18n.locales.map((item) => ({
                      hrefLang:
                        item === i18nConfig.i18n.defaultLocale
                          ? 'x-default'
                          : item,
                      href: getPageUrl(item),
                    }))}
                    openGraph={{
                      url: getPageUrl(),
                      type: 'website',
                      site_name: process.env.NEXT_PUBLIC_APP_NAME,
                      images: [
                        {
                          url: createAbsoluteUrl(
                            '/static/preview.png'
                          ).toString(),
                        },
                      ],
                    }}
                    defaultOpenGraphImageWidth={1600}
                    defaultOpenGraphImageHeight={900}
                  />

                  <Layout embedded={isEmbedded()} pageLayout={pageLayout}>
                    <Component
                      {...{
                        ...pageProps,
                        setPageLayout,
                      }}
                    />
                  </Layout>
                </FeatureProvider>
              </DataProvider>
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </StylesProvider>
    </UIDReset>
  );
};

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & Props> => {
  const initialProps = await App.getInitialProps(appContext);

  // Skip when invoking `getServerSideProps` from the client-side.
  if (appContext.ctx.req?.url?.startsWith('/_next/data/'))
    return { ...initialProps };

  // Skip when invoking `getStaticProps` on error pages.
  if (['/_error', '/404'].includes(appContext.router.pathname))
    return { ...initialProps };

  const session = await getSession(appContext.ctx);
  const expectDesktop =
    !appContext.ctx.req?.headers['user-agent']?.includes('Mobi');

  return {
    ...initialProps,
    session,
    expectDesktop,
  };
};

export default appWithTranslation(MyApp);
