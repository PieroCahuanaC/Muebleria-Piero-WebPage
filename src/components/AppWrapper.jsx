// src/components/AppWrapper.jsx
"use client";
import { CartProvider } from "../context/Cartcontext.jsx";

export default function AppWrapper({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
