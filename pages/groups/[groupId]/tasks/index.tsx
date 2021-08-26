import { GetServerSideProps } from 'next';

import { initializePageData } from 'lib/server';
import { withGroupContext } from 'components/group/misc';
import { GroupTasks } from 'components/group/view';

export default withGroupContext(GroupTasks);

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common', 'group']);
