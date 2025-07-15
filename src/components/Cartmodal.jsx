"use client";
import { useContext, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../context/Cartcontext.jsx";
import Checkout from "../components/Checkout.jsx";


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
                      <p className="font-semibold text-gray-700">
  Precio unitario:{" "}
  <span className="bg-gray-100 px-2 py-1 rounded text-gray-900 font-bold">
    S/. {product.price}
  </span>
</p>







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
              <div className="flex justify-between items-center font-medium text-gray-900">
  <p className="text-sm">Subtotal</p>
  <span className="bg-gray-200 px-3 py-1 rounded-lg text-gray-900 font-bold text-lg tracking-wide shadow-sm">
    S/. {calcularSubtotal()}
  </span>
</div>

              <button
                onClick={clearCart}
                className="mt-3 text-sm text-red-600 hover:underline"
              >
                Vaciar carrito
              </button>
              <a
  href="/checkout"
  className="mt-4 block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-2"
>
  {/* Ícono de WhatsApp */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M20.52 3.48A11.78 11.78 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.98L0 24l6.28-1.6A11.96 11.96 0 0012 24c6.63 0 12-5.37 12-12 0-3.18-1.24-6.16-3.48-8.52zM12 22c-1.91 0-3.77-.52-5.38-1.5l-.39-.23-3.73.95.99-3.65-.25-.38A9.99 9.99 0 012 12C2 6.48 6.48 2 12 2c2.66 0 5.19 1.04 7.07 2.93A9.95 9.95 0 0122 12c0 5.52-4.48 10-10 10zm5.2-7.8c-.28-.14-1.64-.81-1.89-.9s-.44-.14-.63.14c-.19.28-.72.9-.89 1.09-.16.19-.33.21-.61.07a8.07 8.07 0 01-2.37-1.47 8.95 8.95 0 01-1.65-2.03c-.17-.29-.02-.45.13-.6.13-.14.28-.33.42-.5.14-.17.19-.28.28-.47.1-.19.05-.35-.02-.5s-.63-1.52-.86-2.08c-.23-.55-.46-.48-.63-.48l-.52-.01c-.19 0-.5.07-.76.35s-1 1-.98 2.43 1.04 2.83 1.19 3.03c.14.19 2.04 3.12 4.94 4.39.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.11.55-.08 1.64-.67 1.87-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.19-.52-.33z" />
  </svg>
  Enviar pedido por WhatsApp
</a>


            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
