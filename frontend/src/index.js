import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css'; // Global CSS dosyasını kullan
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { BrowserRouter } from 'react-router-dom';

// DEV ortamında debug, PROD ortamında kaldır
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  const logReduxState = require('./utility/debug').default;
  // Başlangıç durumunu logla
  logReduxState(store);
  // Durum değişikliklerini takip et
  store.subscribe(() => {
    logReduxState(store);
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Sadece geliştirme ortamında raporla
if (isDev) {
  const reportWebVitals = require('./reportWebVitals').default;
  reportWebVitals();
}