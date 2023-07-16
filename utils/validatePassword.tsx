import { NextApiResponse } from 'next';

const validatePassword = (password: string, res: NextApiResponse) => {
  if (!password) {
    res.status(400).json({ error: 'Password input field cannot be empty.' });
    return false;
  }

  // Validating password length
  if (password.length < 8) {
    res.status(400).json({ error: 'Password must contain at least 8 characters.' });
    return false;
  }

  // Checking if a password contains at least 1 digit
  if (!/\d/.test(password)) {
    res.status(400).json({ error: 'Password must contain at least 1 digit. ' });
    return false;
  }

  // Checking if contains at least 1 capital letter
  if (!/[A-Z]/.test(password)) {
    res.status(400).json({ error: 'Password must contain at least 1 capital letter.' });
    return false;
  }

  // At least 1 special characters
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    res.status(400).json({ error: 'Password must contain at least 1 special character.' });
    return false;
  }

  return true;
};

export default validatePassword;
