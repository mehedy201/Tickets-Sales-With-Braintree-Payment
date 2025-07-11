import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";
import "./index.css";
import TicketSaleLandingPage from "./pages/TicketSaleLandingPage/TicketSaleLandingPage.jsx";
import LoadingComponents from "./Components/LoadingComponents.jsx";
import TicketsComponents from "./pages/TicketSaleLandingPage/TicketsComponts/TicketsComponents.jsx";
import axios from "axios";
import Dashboard from "./pages/AdminDashboard/Dashboard.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import ProtectRoute from "./pages/ProtectRoute/ProtectRoute.jsx";
import { DropinProvider } from "./utils/DropinContext.jsx";
import AttendeesInfoComponent from "./pages/TicketSaleLandingPage/TicketsComponts/AttendeesInfoComponent.jsx";
import PaymentComponent from "./pages/TicketSaleLandingPage/TicketsComponts/PaymentComponent.jsx";
import TicketBuySuccessResultComponent from "./pages/TicketSaleLandingPage/TicketsComponts/TicketBuySuccessResultComponent.jsx";
// Admin Route Component _____
const Attendees = React.lazy(() =>
  import("./pages/AdminDashboard/Attendees/Attendees.jsx")
);
const Purcher = React.lazy(() =>
  import("./pages/AdminDashboard/Purcher/Purcher.jsx")
);

let router = createBrowserRouter([
  {
    path: "/",
    element: <TicketSaleLandingPage />,
    children: [
      {
        index: true,
        element: <TicketsComponents />,
      },
      {
        path: "/attendees-info",
        element: <AttendeesInfoComponent />,
      },
      {
        path: "/payments",
        element: <PaymentComponent />,
      },
      {
        path: "/success/:id",
        loader: ({ params }) =>
          axios.get(
            `https://tickets-sales-with-braintree-payment-backend-production.up.railway.app/api/v1/ThriveGlobalForum/purcher/${params.id}`
          ),
        element: <TicketBuySuccessResultComponent />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: ":page/:limit",
        element: (
          <Suspense fallback={<LoadingComponents />}>
            <ProtectRoute>
              <Attendees />
            </ProtectRoute>
          </Suspense>
        ),
      },
      {
        path: "purcher/:page/:limit",
        element: (
          <Suspense fallback={<LoadingComponents />}>
            <ProtectRoute>
              <Purcher />
            </ProtectRoute>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/log-in",
    element: <LogIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <DropinProvider>
    <RouterProvider router={router} />
  </DropinProvider>
  // </React.StrictMode>
);
