import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { initializePageData } from 'lib/server';
import { withGroupContext } from 'components/group/misc';
import { GroupTask } from 'components/group/view';

export default withGroupContext(() => {
  const router = useRouter();
  const id = `${router.query.taskId}:Task`;

  return <GroupTask id={id} />;
});

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common', 'group']);
