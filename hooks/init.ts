import { useRouter } from 'next/router';

import { useSession } from 'lib/auth';
import { useLayoutEffect } from 'hooks/ssr';

/** Evaluates the session and redirects authenticated users as early as possible. */
export const useAuthenticatedRedirect = (target = '/') => {
  const router = useRouter();
  const [session, loading] = useSession();

  useLayoutEffect(() => {
    if (!loading && session) {
      router.push(target);
    }
  }, [session, loading]);

  return loading || !!session;
};

/** Evaluates the session and redirects unauthenticated users as early as possible. */
export const useUnauthenticatedRedirect = (
  target = '/',
  alternativeCondition = false
) => {
  const router = useRouter();
  const [session, loading] = useSession();

  useLayoutEffect(() => {
    if (!loading && (!session || alternativeCondition)) {
      router.push(target);
    }
  }, [session, loading, alternativeCondition]);

  return loading || !session || alternativeCondition;
};
