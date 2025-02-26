import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";

function App() {
  //Retornar no App apenas configurações ex: rotas, toastify container
  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
}

export default App;
