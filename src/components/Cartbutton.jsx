"use client";
import { useState, useContext, useEffect } from "react";
import CartModal from "./Cartmodal";
import { CartContext } from "../context/Cartcontext.jsx";

export default function CartButton() {
  const context = useContext(CartContext);

  if (!context) {
    console.error("❌ CartContext no disponible en CartButton");
    return null;
  }

  const { cart, isCartOpen, openCart, closeCart } = context;

  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setItemsCount(total);
  }, [cart]);

  return (
    <>
      <div className="cart-button-wrapper">
        <button
          onClick={openCart}
          className="relative text-2xl hover:scale-110 transition-transform"
          aria-label="Abrir carrito"
        >
          🛒
          {itemsCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemsCount}
            </span>
          )}
        </button>
      </div>

      <CartModal isOpen={isCartOpen} closeModal={closeCart} />
    </>
  );
}
