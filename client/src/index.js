import './index.css';
import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import HttpClient from './network/http';
import AuthService from './service/auth';
import ProductService from './service/product';
import ImageUploader from './service/imageUploadr';
import TokenStorage from './db/token';
import { AuthErrorEventBus, AuthProvider } from './context/AuthContext';
import App from './App';
import ImageAddForm from './components/ImageAddForm/ImageAddForm';

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, authErrorEventBus);
const authService = new AuthService(httpClient, tokenStorage);
const productService = new ProductService(httpClient, tokenStorage);
const imageUploader = new ImageUploader();
const ImageAdd = memo((props) => (
  <ImageAddForm {...props} imageUploader={imageUploader} />
));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App ImageAdd={ImageAdd} productService={productService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
