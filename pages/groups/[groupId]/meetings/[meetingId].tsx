import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { initializePageData } from 'lib/server';
import { withGroupContext } from 'components/group/misc';
import { GroupMeeting } from 'components/group/view';

export default withGroupContext(() => {
  const router = useRouter();
  const id = `U:${router.query.meetingId}:Meeting`;

  return <GroupMeeting id={id} />;
});

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common', 'group']);
