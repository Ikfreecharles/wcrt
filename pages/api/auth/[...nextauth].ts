import NextAuth from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next-auth/_utils';

import { options } from 'lib/auth';

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
