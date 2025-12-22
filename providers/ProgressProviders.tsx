'use client';

import { AppProgressProvider  } from '@bprogress/next';

export default function ProgressProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppProgressProvider
      color="#ee502c"
      height="3px"
      options={{ showSpinner: false }}
    >
      {children}
    </AppProgressProvider>
  );
}
