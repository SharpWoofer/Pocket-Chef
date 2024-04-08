import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react"; //allows for information to be stored in local storage (Cache)
import {persistor, store} from './store';
import App from './App.jsx'
import '@fontsource/roboto/500.css';
import {AuthContextProvider} from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <AuthContextProvider>
        <App />
      </AuthContextProvider>
      </PersistGate>
    </Provider>
  </>,
)