// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import store from './store';

// // declare module 'react-dom' {
// //   let createRoot: any;
// // }

// ReactDOM.createRoot(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') || document.createElement('div'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
reportWebVitals();