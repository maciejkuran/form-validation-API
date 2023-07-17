import { NextApiRequest, NextApiResponse } from 'next';
import rateLimiterMiddleware from '@/rateLimitedMiddleware';
import validateEmail from '@/utils/validateEmail';
import validatePassword from '@/utils/validatePassword';

const rateLimiter = {};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  //Check rate limit
  const rateLimitOk = rateLimiterMiddleware(req, res, rateLimiter);

  if (!rateLimitOk) return;

  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Invalid request method. Accepted: POST' });
  }

  //Validate email address
  const correctEmail = validateEmail(email, res);
  if (!correctEmail) return;

  //Validate password
  const correctPassword = validatePassword(password, res);
  if (!correctPassword) return;

  //Success
  return res.status(200).json({ success: 'Success.' });
};

export default handler;
