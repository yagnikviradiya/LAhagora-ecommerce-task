import './App.css';
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    < >
      <CartProvider>
        <ToastContainer />
        <AppRoutes />
      </CartProvider>
    </>
  );
}

export default App;
