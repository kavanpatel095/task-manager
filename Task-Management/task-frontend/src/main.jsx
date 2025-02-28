import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import { withErrorBoundary } from './HOC/withErrorBoundary';

const AppWithErrorBoundary = withErrorBoundary(App);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppWithErrorBoundary />
  </Provider>
);
