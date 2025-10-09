'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store as publicStore } from '@/store/publicStore';
import { store as adminStore } from '@/store/adminStore';

export function Providers({
  children,
  type = 'public',
}: {
  children: React.ReactNode;
  type?: 'public' | 'admin';
}) {
  const store = type === 'admin' ? adminStore : publicStore;

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        {type === 'admin' && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ReduxProvider>
  );
}
