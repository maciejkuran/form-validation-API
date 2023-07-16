import { ReactNode } from 'react';
import classes from './LayoutWrapper.module.scss';
import Navbar from './Navbar';

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props): ReactNode => {
  return (
    <div className={classes.layout}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default LayoutWrapper;
