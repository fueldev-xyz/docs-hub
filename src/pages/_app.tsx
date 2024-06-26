import { FuelProvider } from '@fuels/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';
import '../styles/docsearch.css';
import '../styles/index.css';

import { defaultConnectors } from '@fuels/connectors';
import { Provider } from '../components/Provider';
import { ShowWarningProvider } from '../hooks/useShowWarning';
import { VersionProvider } from '../hooks/useVersion';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <FuelProvider
        theme='dark'
        fuelConfig={{
          connectors: defaultConnectors({ devMode: true }),
        }}
      >
        <VersionProvider>
          <ShowWarningProvider>
            <Provider>
              <style jsx global>{`
                :root {
                  --fonts-sans: system-ui, 'Inter', sans-serif;
                  --fonts-display: system-ui, 'Inter', sans-serif;
                  --fonts-mono: 'Inconsolata';
                }
              `}</style>
              <Component {...pageProps} />
              <Analytics />
              <SpeedInsights />
              <GoogleAnalytics gaId='G-N4JQYG1RB2' />
            </Provider>
          </ShowWarningProvider>
        </VersionProvider>
      </FuelProvider>
    </QueryClientProvider>
  );
}
