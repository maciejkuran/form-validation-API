import { ReactNode } from 'react';
import classes from './Navbar.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = (): ReactNode => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Image src="/icon.png" alt="logo" width={120} height={120} />
        <h5>
          Forms Validation <br /> REST API
        </h5>
      </div>

      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/#introduction">👋 Introduction</Link>
          </li>
        </ul>

        <ul className={classes['list--merged-items']}>
          <li>
            <Link href="/#api-endpoints">⚡ API Endpoints</Link>
          </li>
          <li className={classes['list__item--small']}>
            <Link href="/#password">/password</Link>
          </li>
          <li className={classes['list__item--small']}>
            <Link href="/#email">/email</Link>
          </li>
          <li className={classes['list__item--small']}>
            <Link href="/#sign-in">/sign-in</Link>
          </li>
          <li className={classes['list__item--small']}>
            <Link href="/#sign-up">/sign-up</Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link href="/#example">⌨ Example</Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link href="/#rate-limit">⏱ Rate Limit</Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link href="/#contribution">🤝 Contribution</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
