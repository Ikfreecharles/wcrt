import { GetServerSideProps } from 'next';

import { initializePageData } from 'lib/server';
import { withGroupContext } from 'components/group/misc';
import { GroupMembersInvites } from 'components/group/view';

export default withGroupContext(GroupMembersInvites);

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common', 'group']);
