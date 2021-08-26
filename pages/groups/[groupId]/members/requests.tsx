import { GetServerSideProps } from 'next';

import { initializePageData } from 'lib/server';
import { withGroupContext } from 'components/group/misc';
import { GroupMembersRequests } from 'components/group/view';

export default withGroupContext(GroupMembersRequests);

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common', 'group']);
