import { NextPage, GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { Box, Card } from '@material-ui/core';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import { getDocumentContent } from 'util/server/files';
import { PageTransition } from 'components/common/page';
import { Markdown } from 'components/common/media';

const DocumentPage: NextPage<
  CommonPageProps & { documentContent: string; documentTitle: string }
> = ({ documentContent, documentTitle }) => (
  <>
    <NextSeo
      title={documentTitle}
      openGraph={{
        title: documentTitle,
      }}
    />

    <PageTransition>
      <Card>
        <Box p={3}>
          <Markdown>{documentContent}</Markdown>
        </Box>
      </Card>
    </PageTransition>
  </>
);

export default DocumentPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const documentContent = getDocumentContent(
      `${ctx.locale}/info/${ctx.params?.document}`
    );
    const documentTitle = documentContent
      .split('\n')[0]
      .replace('#', '')
      .trim();

    return initializePageData(ctx, ['common'], undefined, {
      documentContent,
      documentTitle,
    });
  } catch {
    return { notFound: true };
  }
};
