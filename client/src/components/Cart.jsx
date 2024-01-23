import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { CartItem } from "./CartItem";
import { Typography } from "./Typography";
import { getVNDPrice } from "../helpers/helpers";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

function resultMessage(message) {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
}

export const Cart = () => {
  const { cartItems, cartTotal } = useContext(ShopContext);

  const createOrder = async () => {
    try {
      const response = await axios.post(
        "/api/orders",
        { cart: cartItems }
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
      );

      const orderData = await response.data;

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
    }

    return axios
      .post(
        "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
        {
          cart: cartItems,
        }
      )
      .then((response) => {
        return response.data.id;
      });
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await axios.post(`/api/orders/${data.orderID}/capture`);
      const orderData = response.data;
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message
      const errorDetail = orderData?.details?.[0];
      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData));
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
          orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
        resultMessage(
          `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
    } catch (error) {
      console.error(error);
      resultMessage(
        `Sorry, your transaction could not be processed...<br><br>${error}`
      );
    }
  };

  return (
    <div
      className={
        "absolute right-0 z-10 w-full md:w-[70%] lg:w-[50%] " +
        "bg-white p-5 pt-0 overflow-y-auto max-h-[90vh] " +
        "shadow-lg border border-slate-600"
      }
    >
      <Typography variant="h2" className="font-bold text-center mb-2">
        Cart
      </Typography>
      {cartItems.map((item) => {
        return <CartItem key={item._id} item={item} />;
      })}
      <div className="py-4">
        Total:{" "}
        <span className="text-red-600 font-bold text-2xl">
          {getVNDPrice(cartTotal)}
        </span>
        <div className="flex flex-col gap-2 md:grid md:grid-cols-2 mt-4">
          <button
            type="button"
            className={
              "border border-black px-1 bg-slate-800 " +
              "text-white rounded-xl w-[95%] py-2 mx-auto"
            }
            onClick={() => {}}
          >
            Continue Shopping
          </button>
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
          <div id="result-message"></div>
          {/* <button
            type="button"
            className={
              "border border-black px-1 bg-slate-800 " +
              "text-white rounded-xl w-[95%] py-2 mx-auto"
            }
            onClick={() => {}}
          >
            Checkout
          </button> */}
        </div>
      </div>
    </div>
  );
};
