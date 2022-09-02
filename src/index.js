import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import AlertContext from './components/UI/Alert/AlertContext';
import LoadingContext from './components/UI/Loading/LoadingContext';

import 'material-icons/iconfont/material-icons.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(  
  <Provider store={store}>
    <LoadingContext>
      <AlertContext>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </AlertContext>
    </LoadingContext>
  </Provider>
);
