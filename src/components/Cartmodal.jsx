"use client";
import { useContext, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../context/Cartcontext.jsx";

export default function CartModal({ isOpen, closeModal }) {
  const context = useContext(CartContext);
  const [addedMessage, setAddedMessage] = useState("");

  if (!context) {
    console.error("❌ CartContext no está disponible en CartModal");
    return null;
  }

  const { cart, removeFromCart, clearCart } = context;

  const calcularSubtotal = () => {
    return cart
      .reduce((acc, item) => {
        const precioNumerico = parseFloat(
          item.price.toString().replace(/[^\d.]/g, "")
        );
        return acc + precioNumerico * item.quantity;
      }, 0)
      .toFixed(2);
  };

  useEffect(() => {
    const storedMessage = localStorage.getItem("addedProductMessage");
    if (storedMessage) {
      setAddedMessage(`Agregaste ${storedMessage}`);
      setTimeout(() => {
        setAddedMessage("");
        localStorage.removeItem("addedProductMessage");
      }, 3000);
    }
  }, []);

  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={closeModal}>
      {/* Fondo estático sin animación */}
      <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true" />
      {/* Panel del carrito */}
      <div className="fixed inset-0 flex items-center justify-end overflow-hidden">
        <Dialog.Panel className="w-full max-w-md bg-white shadow-xl h-full overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Mi carrito
            </Dialog.Title>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {addedMessage && (
              <p className="mb-4 text-center text-black bg-gray-200 py-2 px-4 rounded-md shadow-sm">
                {addedMessage}
              </p>
            )}
            {cart.length === 0 ? (
              <p className="text-gray-500">El carrito está vacío</p>
            ) : (
              <ul className="-my-6 divide-y divide-gray-200">
                {cart.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded border border-gray-200">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-gray-900 font-medium">{product.name}</h3>
                        <p className="text-gray-600 text-sm">
                          Cantidad: {product.quantity}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-gray-900 font-bold">Precio unitario: S/  {product.price}</p>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t px-6 py-4">
              <div className="flex justify-between font-medium text-gray-900">
                <p>Subtotal</p>
                <p>S/ {calcularSubtotal()}</p>
              </div>
              <button
                onClick={clearCart}
                className="mt-3 text-sm text-red-600 hover:underline"
              >
                Vaciar carrito
              </button>
              <a
                href="/checkout"
                className="mt-4 block w-full text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              >
                Ir al checkout
              </a>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
