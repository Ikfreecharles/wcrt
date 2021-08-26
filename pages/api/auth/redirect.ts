import { NextApiRequest, NextApiResponse } from 'next';
import { getCsrfToken } from 'next-auth/client';
import { createHash } from 'crypto';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const csrfToken = await getCsrfToken({ req });
  if (!csrfToken) throw new Error('Missing CSRF token');

  const csrfTokenHash = createHash('sha256')
    .update(`${csrfToken}${process.env.NEXTAUTH_SECRET}`)
    .digest('hex');

  const signInResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signin/wecreate`,
    {
      method: 'POST',
      redirect: 'manual',
      body: new URLSearchParams({
        csrfToken,
      }),
      headers: {
        Cookie: `next-auth.csrf-token=${csrfToken}|${csrfTokenHash}`,
      },
    }
  );

  const signInUrl = signInResponse.headers.get('location');
  if (!signInUrl) throw new Error('Missing redirect URL');

  res.redirect(signInUrl);
};
