import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, { FirebaseContext } from './store/Context';
import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from './Firebase/Config';



ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Context>
    <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);