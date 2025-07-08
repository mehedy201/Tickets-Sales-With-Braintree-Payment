import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router";
import ReactDOM from 'react-dom/client'
import './index.css'
import TicketSaleLandingPage from './pages/TicketSaleLandingPage/TicketSaleLandingPage.jsx';
import LoadingComponents from './Components/LoadingComponents.jsx';
import TicketsComponents from './pages/TicketSaleLandingPage/TicketsComponts/TicketsComponents.jsx';
import axios from 'axios';
const AttendeesInfoComponent = React.lazy(() => import('./pages/TicketSaleLandingPage/TicketsComponts/AttendeesInfoComponent.jsx'));
const PaymentComponent = React.lazy(() => import('./pages/TicketSaleLandingPage/TicketsComponts/PaymentComponent.jsx'));
const TicketBuySuccessResultComponent = React.lazy(() => import('./pages/TicketSaleLandingPage/TicketsComponts/TicketBuySuccessResultComponent.jsx'));


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
      {
        path: '/success/:id',
        loader: ({ params }) => axios.get(`http://localhost:5000/api/v1/icghc/purcher/${params.id}`),
        element: <Suspense fallback={<LoadingComponents/>}><TicketBuySuccessResultComponent/></Suspense>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
