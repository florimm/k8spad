import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from './Layout';
import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <Layout />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

// calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
// eslint-disable-next-line no-console
//   console.log(arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
