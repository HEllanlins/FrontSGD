import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';
import { Providers } from './providers/Providers';

function App() {
  //Retornar no App apenas configurações ex: rotas, toastify container
  return (
    <Providers>
      <ToastContainer />
      <AppRoutes />
    </Providers>
  );
}

export default App;
