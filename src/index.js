import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {AppTest} from './Pages/Doc/App'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './Utils/store'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './Pages/Sing-In/SignIn';
import { CallbackRoute } from './apis/CallBack';
import {Test} from './Pages/Test'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path : "/docs",
    element : <AppTest/>
  },
  {
    path : "/auth/callback",
    element : <CallbackRoute />

  },
  {
    path : "/testdocs",
    element : <AppTest/>
  },
  {
    path : "/test",
    element : <Test/>
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>

      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
