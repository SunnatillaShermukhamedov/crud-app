import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'normalize.css';

import Container from './components/Container';
import Header from './components/Header';
import Users from './containers/Users';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={client}>
      <Header />
      <Container>
        <Users />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
