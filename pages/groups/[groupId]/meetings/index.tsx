import { GetServerSideProps } from 'next';

import { initializePageData } from 'lib/server';
import { withGroupContext } from 'components/group/misc';
import { GroupMeetings } from 'components/group/view';

export default withGroupContext(GroupMeetings);

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common', 'group']);
