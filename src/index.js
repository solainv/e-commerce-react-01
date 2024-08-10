// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import "remixicon/fonts/remixicon.css";
// import "bootstrap/dist/css/bootstrap.css";
// import './index.css';
// import App from './App';
// import store from './redux/store';
// import { Provider } from "react-redux";
// import { BrowserRouter as BR } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <>
//     <BR>
//       <Provider store={store}>
//         <ToastContainer
//           position="top-left"
//           autoClose={3000}
//           closeOnClick
//           pauseOnHover
//           theme="colored"
//           />
//         <ToastContainer />
//         <App />
//       </Provider>
//     </BR>

//   </>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify'; // Import Bounce transition
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Provider store={store}>
      <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable
        theme="colored"
        transition={Bounce} // Use Bounce transition
      />
      <App />
    </Provider>
  </Router>
);
