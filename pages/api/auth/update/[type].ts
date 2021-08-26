import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'lib/auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = (await getSession({ req }))?.account.accessToken;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOGIN_URL}/api/${req.query.type}`,
    {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const responseData = await response.json();

  res.status(response.status).json(responseData);
};
