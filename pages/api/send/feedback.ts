import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'lib/auth';

const requestHelpdeskApi = (
  endpoint: string,
  data: unknown,
  onBehalfOf?: string
) =>
  fetch(`${process.env.NEXT_PUBLIC_HELPDESK_URL}/api/v1/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HELPDESK_TOKEN}`,
      ...(onBehalfOf && { 'X-On-Behalf-Of': onBehalfOf }),
    },
  });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const email = (await getSession({ req }))?.user.email;

  if (req.method !== 'POST' || !req.body.text || !email) {
    res.status(400).end();
    return;
  }

  const userCreation = await requestHelpdeskApi('users', { email });
  const ticketCreation = await requestHelpdeskApi(
    'tickets',
    {
      title: 'Feedback',
      group: 'Users',
      article: { type: 'web', body: req.body.text },
    },
    email
  );

  const success =
    (userCreation.status === 201 || userCreation.status === 422) &&
    ticketCreation.status === 201;

  res.status(success ? 201 : 502).json({});
};
