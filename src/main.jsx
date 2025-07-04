import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router";
import ReactDOM from 'react-dom/client'
import './index.css'
import TicketSaleLandingPage from './pages/TicketSaleLandingPage/TicketSaleLandingPage.jsx';
import LoadingComponents from './Components/LoadingComponents.jsx';
import TicketsComponents from './pages/TicketSaleLandingPage/TicketsComponts/TicketsComponents.jsx';


let router = createBrowserRouter([
  {
    path: "/",
    element: <TicketSaleLandingPage/>,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<LoadingComponents/>}><TicketsComponents/></Suspense>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
