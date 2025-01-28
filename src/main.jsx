// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { persistor, store } from './app/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';
import './index.scss';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer pauseOnFocusLoss={false} position="bottom-right" />
    </PersistGate>
  </Provider>
  // </StrictMode>
);
