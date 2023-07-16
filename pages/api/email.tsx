import { NextApiRequest, NextApiResponse } from 'next';
import rateLimiterMiddleware from '@/rateLimitedMiddleware';
import validateEmail from '@/utils/validateEmail';

const rateLimiter = {};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  //Check rate limit
  const rateLimitOk = rateLimiterMiddleware(req, res, rateLimiter);

  if (!rateLimitOk) return;

  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Invalid request method. Accepted: POST' });
  }

  const correctEmail = validateEmail(email, res);

  if (!correctEmail) return;

  // Email is valid
  return res.status(200).json({ message: 'Email is valid.' });
};

export default handler;
