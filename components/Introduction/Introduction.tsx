import { ReactNode } from 'react';
import classes from './Introduction.module.scss';

const Introduction = (): ReactNode => {
  return (
    <section id="introduction" className={classes.introduction}>
      <h1>Forms Validation REST API Documentation</h1>
      <p>
        Introducing the Lightning Fast Free Form Validation REST API! 🚀. You don&lsquo;t have to
        worry about form validation anymore, and write boilerplate code 😩. This API handles
        validation out-of-the-box 📦! It&lsquo;s as simple as that.
      </p>
      <p className={classes['introduction__version']}>Current version: 1.0</p>
      <p>
        🔗 API BASE URL:{' '}
        <code className="code">https://forms-validation-api.vercel.app/api/v1.0</code>
      </p>
    </section>
  );
};

export default Introduction;
