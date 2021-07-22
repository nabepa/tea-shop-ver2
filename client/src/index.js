import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import HttpClient from './network/http';
import AuthService from './service/auth';
import TokenStorage from './db/token';
import { AuthErrorEventBus, AuthProvider } from './context/AuthContext';
import App from './App';

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const authErrorEventBus = new AuthErrorEventBus();
// Todo: authErrorEventBus 넣을 필요 있나...? 오히려 넣으면 service 별로 client도 따로 만들어야함
const httpClient = new HttpClient(baseURL, authErrorEventBus);
const authService = new AuthService(httpClient, tokenStorage);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
