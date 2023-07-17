import { NextApiRequest, NextApiResponse } from 'next';
import rateLimiterMiddleware from '@/rateLimitedMiddleware';
import validatePassword from '@/utils/validatePassword';

const rateLimiter = {};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { password } = req.body;

  //Check rate limit
  const rateLimitOk = rateLimiterMiddleware(req, res, rateLimiter);

  if (!rateLimitOk) return;

  //Preventing CORS issues.If you try to send a POST etc.. request , the preflight will send it’s ‘first army’ to check the ‘battle field’. But this army is not the request itself, but an OPTION request. That’s why in our API we need to handle OPTION request.
  if (req.method === 'OPTIONS') {
    return res.status(200).json({
      body: 'OK',
    });
  }

  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Invalid request method. Accepted: POST' });
  }

  const correctPassword = validatePassword(password, res);

  if (!correctPassword) return;

  //Success
  return res.status(200).json({ success: 'Success.' });
};

export default handler;
