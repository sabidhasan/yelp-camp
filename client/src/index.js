// Basic file for loading react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import register  from './registerServiceWorker';
import './css/style.css';

import App from './components/App.js';
register();
// import registerServiceWorker from './registerServiceWorker';

// TO--DO
// add logic here for routing using BrowserRouter

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
