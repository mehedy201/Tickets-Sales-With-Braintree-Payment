import React, { createContext, useState } from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router";
import ReactDOM from 'react-dom/client'
import './index.css'
import TicketSaleLandingPage from './pages/TicketSaleLandingPage/TicketSaleLandingPage.jsx';


let router = createBrowserRouter([
  {
    path: "/",
    element: <TicketSaleLandingPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
