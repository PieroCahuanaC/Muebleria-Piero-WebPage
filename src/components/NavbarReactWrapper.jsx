// src/components/NavbarReactWrapper.jsx
"use client";
import { CartProvider } from "../context/Cartcontext.jsx";
import CartButton from "./Cartbutton.jsx";

export default function NavbarReactWrapper() {
  return (
    <CartProvider>
      <CartButton />
    </CartProvider>
  );
}
