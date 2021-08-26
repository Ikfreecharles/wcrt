import { GetServerSideProps } from 'next';

import { initializePageData } from 'lib/server';
import { withGroupContext } from 'components/group/misc';
import { GroupContents } from 'components/group/view';

export default withGroupContext(GroupContents);

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common', 'group']);
