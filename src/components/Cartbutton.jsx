"use client";
import { useState, useContext } from "react";
import CartModal from "./Cartmodal";
import { CartContext } from "../context/Cartcontext.jsx";

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(CartContext);

  if (!context) {
    console.error("❌ CartContext no disponible en CartButton");
    return null;
  }

  const { cart } = context;

  // Total de ítems
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => {
          console.log("🛒 Abriendo modal...");
          setIsOpen(true);
        }}
        className="relative text-2xl hover:scale-110 transition-transform"
        aria-label="Abrir carrito"
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <CartModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  );
}
