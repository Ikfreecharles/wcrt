import { GetServerSideProps } from 'next';

import { initializePageData } from 'lib/server';
import { useTranslation } from 'lib/i18n';
import { withGroupContext } from 'components/group/misc';
import { GroupEntityCreate } from 'components/group/view';
import { ArticleForm } from 'components/common/form';

export default withGroupContext(() => {
  const { t } = useTranslation();

  return (
    <GroupEntityCreate title={t('action.createArticle')} Form={ArticleForm} />
  );
});

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common', 'group']);
