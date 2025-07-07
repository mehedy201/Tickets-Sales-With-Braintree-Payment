import { FaCircleCheck } from "react-icons/fa6";
import OrderSummaryComponents from "../OrderSummaryComponents/OrderSummaryComponents";


const TicketBuySuccessResultComponent = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center py-8 gap-2">
                <FaCircleCheck className="text-green-500" size={36}/>
                <h2 className="text-center text-lg font-semibold">Success Transaction ID: </h2>
            </div>
        </div>
    );
};

export default TicketBuySuccessResultComponent;