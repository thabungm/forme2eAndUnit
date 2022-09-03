import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Form from './components/Form';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <StyledEngineProvider>
      <QueryClientProvider client={queryClient}>
        <Form />
      </QueryClientProvider>
    </StyledEngineProvider>
  );
}

export default App;
