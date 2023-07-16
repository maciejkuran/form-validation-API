import { NextApiResponse } from 'next';

const validateEmail = (email: string, res: NextApiResponse) => {
  // Check if email is not empty
  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return false;
  }

  // Check if email contains special characters
  const specialCharsRegex = /[!#$%^&*(),?":{}|<>~^+/=`]/;
  if (specialCharsRegex.test(email)) {
    res.status(400).json({ error: 'Email contains special characters.' });
    return false;
  }

  // Check if email has no spaces
  if (/\s/.test(email)) {
    res.status(400).json({ error: 'Email should not contain spaces.' });
    return false;
  }

  // Check if email contains @ symbol
  if (!/@/.test(email)) {
    res.status(400).json({ error: 'Email should contain @ symbol.' });
    return false;
  }

  // Split email into username and domain parts
  const [username, domain] = email.split('@');

  // Check if @ is not in the username portion
  if (/@/.test(username)) {
    res.status(400).json({ error: 'Invalid email format.' });
    return false;
  }

  // Check if email contains offensive, vulgar or inappropriate content
  //prettier-ignore
  const prohibitedWords = ['bitch', 'motherfucker', 'shit', 'pussy', 'ass', 'asshole', 'bollocks', 'fuck', 'cock', 'cocksucker', 'cunt', 'dick', 'crap', 'nigga', 'nigra', "nigger", 'slut', 'sonofabitch', 'whore', 'twat', 'moron', 'idiot', 'stupid' ]; // Feel free to add more words...
  const containsProhibitedWord = prohibitedWords.some(word => email.toLowerCase().includes(word));
  if (containsProhibitedWord) {
    res.status(400).json({ error: 'Email contains offensive content.' });
    return false;
  }

  return true;
};

export default validateEmail;
