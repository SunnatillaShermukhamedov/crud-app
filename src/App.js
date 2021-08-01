import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'normalize.css';
import ReactModal from 'react-modal';

import Container from './components/Container';
import Header from './components/Header';
import Users from './containers/Users';
import Button from './components/Button';
import Paragraph from './components/Paragraph';
import UserFormModal from './containers/UserFormModal';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactModal.setAppElement('#root');

function App() {
  const [showModal, setModal] = useState(false);

  return (
    <QueryClientProvider client={client}>
      <Header />
      <Container>
        <Paragraph $textAlign="right">
          <Button title="Add" size="medium" onClick={() => setModal(true)} />
        </Paragraph>
        <Users />
      </Container>
      {showModal && (
        <UserFormModal
          title="Add New User"
          closeModal={() => setModal(false)}
        />
      )}
    </QueryClientProvider>
  );
}

export default App;
