import { BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import './App.css';
import { ThemeProvider } from "./context/ThemeContext";
import Footer from './components/layout/Footer';
import Store from "./store/store";
import { Provider } from 'react-redux';
import CartDrawer from './components/cart/CartDrawer';
import AppRoutes from './components/apiRoutes/routes';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
      <Provider store={Store}>
        <CartProvider>
          <ThemeProvider>
            <BrowserRouter>
              <Header />
              <AppRoutes />
              <Footer />
              <CartDrawer />
            </BrowserRouter>
          </ThemeProvider>
        </CartProvider>
      </Provider>
    </>
  );
}

export default App;
