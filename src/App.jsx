import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';
import { UsuarioProvider } from './providers/UsuarioProvider';

function App() {
  //Retornar no App apenas configurações ex: rotas, toastify container
  return (
    <UsuarioProvider>
      <ToastContainer />
      <AppRoutes />
    </UsuarioProvider>
  );
}

export default App;
