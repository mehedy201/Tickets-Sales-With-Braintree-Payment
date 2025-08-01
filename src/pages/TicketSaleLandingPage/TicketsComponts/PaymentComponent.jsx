import { useContext, useEffect, useRef, useState } from "react";
import OrderSummaryComponents from "../OrderSummaryComponents/OrderSummaryComponents";
import { useNavigate } from "react-router-dom";
import { TicketsDataContext } from "../TicketSaleLandingPage";
import axios from "axios";
import useAttendeesSpecificTicketTaxDiscountCalculate from "../../../hooks/useAttendeesSpecificTicketTaxDiscountCalculate";
import { useDropin } from "../../../utils/DropinContext";
import usePageTracking from "../../../hooks/usePageTracking";

const PaymentComponent = () => {
  usePageTracking();
  const {
    setSteps,
    // Quantity ________________________________________
    lowTicketsQuantity,
    setLowTicketsQuantity,
    fullTicketsQuantity,
    setFullTicketsQuantity,
    corporateTicketsQuantity,
    setCorporateTicketsQuantity,
    // Price ___________________________________________
    setLowTicketsPrice,
    setFullTicketsPrice,
    setCorporateTicketsPrice,
    setTotalParice,
    payAblePrice,
    setPayAblePrice,
    cuponCode,
    setCuponCode,
    // Purcher and Attendees Info Collect ______________
    purcherAttendeesInfo,
    setPurcherAttendeesInfo,
  } = useContext(TicketsDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      lowTicketsQuantity + fullTicketsQuantity + corporateTicketsQuantity ==
      0
    )
      navigate("/");
    if (!purcherAttendeesInfo) {
      navigate("/");
      setSteps(1);
    }
  }, []);

  // const dropinInstance = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { isReady, mountToContainer, initializeBraintree, dropinInstance } =
    useDropin();
  useEffect(() => {
    const runSetup = async () => {
      if (!isReady) {
        await initializeBraintree(); // Ensure preload happens if not yet
      }

      // Ensure the drop-in is mounted once token is ready
      if (isReady) {
        await mountToContainer("#dropin-container");
      }
    };

    runSetup();
  }, [isReady]);

  // useEffect(() => {
  //     if(!clientToken){
  //         const getClientToken = async () => {
  //         const res = await axios.get('https://tickets-sales-with-braintree-payment-backend-production.up.railway.app/api/v1/ThriveGlobalForum/client-token');
  //         setClientToken(res.data.clientToken);
  //         };
  //         getClientToken();
  //     }
  // }, []);

  // useEffect(() => {
  //     if (clientToken) {
  //     dropin.create({
  //         authorization: clientToken,
  //         container: '#dropin-container',
  //         threeDSecure: true,
  //     }, (err, instance) => {
  //         if (err) return console.error(err);
  //         dropinInstance.current = instance;
  //     });
  //     }
  // }, [clientToken]);

  const [termsCondition, setTermsCondition] = useState(false);
  const handlePayment = async () => {
    setLoading(true);
    setMessage("");
    if (termsCondition === false) {
      setMessage("Terms and condition Required");
      setLoading(false);
      return;
    }
    const totalQuantity =
      lowTicketsQuantity + fullTicketsQuantity + corporateTicketsQuantity;
    if (!dropinInstance.current) return;

    const updatedAttendees = purcherAttendeesInfo.attendees.map((att) => ({
      ...att,
      purcher: purcherAttendeesInfo.purcher,
      taxDiscountCupon: useAttendeesSpecificTicketTaxDiscountCalculate({
        data: { price: att.price, group: totalQuantity, cuponCode: cuponCode },
      }),
    }));

    console.log("Final Data:", updatedAttendees);
    console.log("Final Purcher:", purcherAttendeesInfo.purcher);

    try {
      const { nonce } = await dropinInstance.current.requestPaymentMethod({
        threeDSecure: {
          amount: payAblePrice, // Dummy amount; real amount is calculated server-side
        },
      });

      const purcherAttendeesData = {
        attendees: updatedAttendees,
        purcher: purcherAttendeesInfo.purcher,
      };
      const response = await axios.post(
        "https://tickets-sales-with-braintree-payment-backend-production.up.railway.app/api/v1/ThriveGlobalForum/checkout",
        {
          nonce,
          lowTicketsQuantity,
          fullTicketsQuantity,
          corporateTicketsQuantity,
          cuponCode,
          purcherAttendeesData,
        }
      );

      if (response.data.success) {
        const url = `/success/${response.data.purcherID}`;
        navigate(url);
        setLoading(false);
        // Quantity ________________________________________
        setLowTicketsQuantity(0);
        setFullTicketsQuantity(0);
        setCorporateTicketsQuantity(0);
        // Price ___________________________________________
        setLowTicketsPrice(0);
        setFullTicketsPrice(0);
        setCorporateTicketsPrice(0);
        setTotalParice(0);
        setPayAblePrice(0);
        setCuponCode("");
        // Purcher and Attendees Info Collect ______________
        setPurcherAttendeesInfo("");
      } else {
        setMessage(`❌ Payment failed: ${response.data.message}`);
        setLoading(false);
      }
    } catch (err) {
      setMessage("❌ Payment error occurred.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="py-4 grid md:grid-cols-3 gap-4">
        <div className="cols md:col-span-2">
          {/* Payment____________________________________________________________ */}
          <OrderSummaryComponents />
        </div>
        {/* Tickets Order summary___________________________________________________ */}
        {/* ________________________________________________________________________ */}
        <div className="relative cols">
          <div className="bg-slate-100 p-4 rounded-md sticky top-4 h-[fit-content]">
            {/* <OrderSummaryComponents /> */}
            <div className="max-w-md mx-auto p-4 border border-gray-300 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Secure Payment</h2>
              <div
                id="dropin-container"
                className="mb-4 border-none shadow"
              ></div>
              <div className="flex items-start gap-3">
                <input
                  className="scale-120 mt-[6px]"
                  onChange={(e) => {
                    setTermsCondition(e.target.checked);
                    if (e.target.checked === true) {
                      setMessage("");
                    }
                  }}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>
                  By registering, I agree to the terms and conditions.{" "}
                  <a
                    className="text-blue-700"
                    target="_blank"
                    href="https://thriveglobalforum.com/terms-and-conditions/"
                  >
                    Terms & conditions
                  </a>
                </p>
              </div>
              {message && (
                <p className="mt-4 text-sm text-red-700">{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span
          onClick={() => {
            navigate("/attendees-info");
            setSteps(2);
          }}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition cursor-pointer"
        >
          Previous
        </span>
        <span
          onClick={handlePayment}
          disabled={loading || !dropinInstance.current || !termsCondition}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? `Processing...` : `Register`}
        </span>
      </div>
    </>
  );
};

export default PaymentComponent;
