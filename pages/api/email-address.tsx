import { NextApiRequest, NextApiResponse } from 'next';
import rateLimiterMiddleware from '@/rateLimitedMiddleware';

const rateLimiter = {};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  //Check rate limit
  const rateLimitOk = rateLimiterMiddleware(req, res, rateLimiter);

  if (!rateLimitOk) return;

  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Invalid request method. Accepted: POST' });
  }

  // Check if email is not empty
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  // Check if email contains special characters
  const specialCharsRegex = /[!#$%^&*(),?":{}|<>~^+/=]/;
  if (specialCharsRegex.test(email)) {
    return res.status(400).json({ error: 'Email contains special characters.' });
  }

  // Check if email has no spaces
  if (/\s/.test(email)) {
    return res.status(400).json({ error: 'Email should not contain spaces.' });
  }

  // Check if email contains @ symbol
  if (!/@/.test(email)) {
    return res.status(400).json({ error: 'Email should contain @ symbol.' });
  }

  // Split email into username and domain parts
  const [username, domain] = email.split('@');

  // Check if @ is not in the username portion
  if (/@/.test(username)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // Check if email contains offensive or inappropriate content
  //prettier-ignore
  const prohibitedWords = ['bitch', 'motherfucker', 'shit', 'pussy', 'ass', 'asshole', 'bollocks', 'fuck', 'cock', 'cocksucker', 'cunt', 'dick', 'crap', 'nigga', 'nigra', "nigger", 'slut', 'sonofabitch', 'whore', 'twat', 'moron', 'idiot', 'stupid' ]; // Feel free to add more words...
  const containsProhibitedWord = prohibitedWords.some(word => email.toLowerCase().includes(word));
  if (containsProhibitedWord) {
    return res.status(400).json({ error: 'Email contains offensive content.' });
  }

  // Email is valid
  return res.status(200).json({ message: 'Email is valid.' });
};

export default handler;
