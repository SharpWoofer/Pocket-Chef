import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";  //allows for information to be stored in local storage (Cache)
import { persistor, store } from './store';
import App from './App.jsx'
import '@fontsource/roboto/500.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)