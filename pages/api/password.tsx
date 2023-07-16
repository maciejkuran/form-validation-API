import { NextApiRequest, NextApiResponse } from 'next';
import rateLimiterMiddleware from '@/rateLimitedMiddleware';

const rateLimiter = {};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { password } = req.body;

  //Check rate limit
  const rateLimitOk = rateLimiterMiddleware(req, res, rateLimiter);

  if (!rateLimitOk) return;

  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Invalid request method. Accepted: POST' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password input field cannot be empty.' });
  }

  // Validating password length
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must contain at least 8 characters.' });
  }

  // Checking if a password contains at least 1 digit
  if (!/\d/.test(password)) {
    return res.status(400).json({ error: 'Password must contain at least 1 digit. ' });
  }

  // Checking if contains at least 1 capital letter
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({ error: 'Password must contain at least 1 capital letter.' });
  }

  // At least 1 special characters
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return res.status(400).json({ error: 'Password must contain at least 1 special character.' });
  }

  return res.status(200).json({ success: 'Correct password.' });
};

export default handler;
