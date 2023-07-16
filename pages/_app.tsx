import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  );
}
