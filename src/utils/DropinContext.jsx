import { createContext, useContext, useRef, useState } from "react";
import dropin from "braintree-web-drop-in";
import axios from "axios";

const DropinContext = createContext();

export const DropinProvider = ({ children }) => {
  const dropinInstanceRef = useRef(null);
  const [clientToken, setClientToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize Drop-in and preload into hidden container
  const initializeBraintree = async () => {
    if (isReady || dropinInstanceRef.current) {
      console.log("✅ Drop-in already initialized. Skipping...");
      return;
    }

    try {
      const res = await axios.get(
        "https://tickets-sales-with-braintree-payment-backend-production.up.railway.app/api/v1/ThriveGlobalForum/client-token"
      );
      const token = res.data.clientToken;
      setClientToken(token);
      console.log("🔐 Token fetched");

      // Check if hidden div already exists
      let hiddenDiv = document.getElementById("dropin-hidden");
      if (!hiddenDiv) {
        hiddenDiv = document.createElement("div");
        hiddenDiv.id = "dropin-hidden";
        hiddenDiv.style.position = "absolute";
        hiddenDiv.style.opacity = "0";
        hiddenDiv.style.width = "0px";
        hiddenDiv.style.height = "0px";
        hiddenDiv.style.pointerEvents = "none";
        hiddenDiv.style.overflow = "hidden";
        document.body.appendChild(hiddenDiv);
      }

      if (!hiddenDiv.hasChildNodes()) {
        const instance = await dropin.create({
          authorization: token,
          container: hiddenDiv,
          threeDSecure: true,
        });
        dropinInstanceRef.current = instance;
        setIsReady(true);
        console.log("✅ Drop-in preloaded into hidden container");
      } else {
        console.warn(
          "⚠️ Hidden container already has content. Skipping preload."
        );
      }
    } catch (error) {
      console.error("❌ Braintree Init Error:", error);
    }
  };

  // Attach Drop-in to payment container
  const mountToContainer = async (selector = "#dropin-container", amount) => {
    console.log("📦 Trying to mount drop-in to:", selector);

    const container = document.querySelector(selector);
    if (!clientToken || !container) {
      console.warn("⚠️ Token missing or container not found");
      return;
    }

    // ✅ If already attached to the same container, skip
    if (
      dropinInstanceRef.current?._dropinWrapper?.parentElement === container
    ) {
      console.log("✅ Already mounted. Skipping reattach.");
      return;
    }

    // ✅ Teardown only if attached somewhere
    if (dropinInstanceRef.current?._dropinWrapper?.parentElement) {
      console.log("♻️ Teardown previous instance");
      await dropinInstanceRef.current.teardown().catch((err) => {
        if (err.code !== "METHOD_CALLED_AFTER_TEARDOWN") {
          console.error("❌ Teardown error:", err);
        }
      });
      dropinInstanceRef.current = null;
    }

    // ✅ Create fresh Drop-in instance in real container
    try {
      const instance = await dropin.create({
        authorization: clientToken,
        container: selector,
        threeDSecure: true,
      });

      dropinInstanceRef.current = instance;
      console.log("✅ Drop-in successfully mounted");
    } catch (error) {
      console.error("❌ Drop-in creation failed:", error);
    }
  };

  return (
    <DropinContext.Provider
      value={{
        isReady,
        dropinInstance: dropinInstanceRef,
        initializeBraintree,
        mountToContainer,
      }}
    >
      {children}
    </DropinContext.Provider>
  );
};

export const useDropin = () => useContext(DropinContext);
