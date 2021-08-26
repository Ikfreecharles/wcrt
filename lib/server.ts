import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryOptions } from '@apollo/client';
import isbot from 'isbot';

import { i18nConfig } from 'lib/i18n';
import { initializeCache } from 'lib/apollo';
import { hasProperty } from 'util/type';

/**
 * A shortcut function to bundle common tasks of `getServerSideProps`: Loading
 * translations and preparing the Apollo Client for search engines.
 */
export const initializePageData = async (
  ctx: GetServerSidePropsContext | GetStaticPropsContext,
  i18nNamespaces: string[],
  prefetchQuery?: QueryOptions,
  otherProps?: Record<string, unknown>
) => {
  const i18nProps = await serverSideTranslations(
    ctx.locale || i18nConfig.i18n.defaultLocale,
    i18nNamespaces,
    i18nConfig
  );

  const apolloProps =
    prefetchQuery &&
    hasProperty(ctx, 'req') &&
    isbot(ctx.req.headers['user-agent']!)
      ? {
          initialApolloState: await initializeCache(ctx, prefetchQuery),
        }
      : {};

  return {
    props: {
      ...i18nProps,
      ...apolloProps,
      ...otherProps,
    },
  };
};
