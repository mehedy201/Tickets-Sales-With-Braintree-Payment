import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router";
import ReactDOM from 'react-dom/client'
import './index.css'
import TicketSaleLandingPage from './pages/TicketSaleLandingPage/TicketSaleLandingPage.jsx';
import LoadingComponents from './Components/LoadingComponents.jsx';
import TicketsComponents from './pages/TicketSaleLandingPage/TicketsComponts/TicketsComponents.jsx';
const AttendeesInfoComponent = React.lazy(() => import('./pages/TicketSaleLandingPage/TicketsComponts/AttendeesInfoComponent.jsx'));
const PaymentComponent = React.lazy(() => import('./pages/TicketSaleLandingPage/TicketsComponts/PaymentComponent.jsx'));


let router = createBrowserRouter([
  {
    path: "/",
    element: <TicketSaleLandingPage/>,
    children: [
      {
        path: '/',
        element: <TicketsComponents/>
      },
      {
        path: '/attendees-info',
        element: <Suspense fallback={<LoadingComponents/>}><AttendeesInfoComponent/></Suspense>
      },
      {
        path: '/payments',
        element: <Suspense fallback={<LoadingComponents/>}><PaymentComponent/></Suspense>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
