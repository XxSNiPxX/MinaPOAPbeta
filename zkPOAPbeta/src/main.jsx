import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import store from './store'
import { Provider } from 'react-redux'

import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>

  <Provider store={store}>

      <ThemeProvider>
        <App />
      </ThemeProvider>

      </Provider>
    </Router>
  </React.StrictMode>
);
