// src/components/CheckoutWrapper.jsx
import { CartProvider } from "../context/Cartcontext.jsx";
import Checkout from "./Checkout.jsx";

export default function CheckoutWrapper() {
  return (
    <CartProvider>
      <Checkout />
    </CartProvider>
  );
}
