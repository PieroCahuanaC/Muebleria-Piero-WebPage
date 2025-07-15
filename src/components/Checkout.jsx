"use client";
import { useContext, useState } from "react";
import { CartContext } from "../context/Cartcontext.jsx";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const isValidPhone = (phone) => /^\d{6,15}$/.test(phone); // mínimo 6, máximo 15 cifras

  const [isSending, setIsSending] = useState(false);

  if (!cart || cart.length === 0) {
    return <p className="text-center mt-10 text-lg">Tu carrito está vacío.</p>;
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    if (isSending) return;
  
    if (!name || !phone) {
      alert("Por favor, completa tu nombre y teléfono.");
      return;
    }
  
    if (!isValidPhone(phone)) {
        alert("El número de teléfono debe contener solo números.");
        return;
      }
    
      if (name.length > 50 || phone.length > 20 || notes.length > 200) {
        alert("Verifica que los campos no sean excesivamente largos.");
        return;
      }
      
  
    setIsSending(true); // 🚫 Bloquea múltiples envíos
  
    const cartItemsText = cart.map(item =>
      `• ${item.name} (x${item.quantity}) — S/. ${item.price * item.quantity}`
    ).join("\n");
  
    const message = `Hola, quiero hacer un pedido desde la tienda web:\n\n` +
      `Nombre: ${name}\n` +
      `Teléfono: ${phone}\n` +
      `Dirección: ${address || "No especificada"}\n` +
      `Notas: ${notes || "Ninguna"}\n\n` +
      `Productos seleccionados:\n${cartItemsText}\n\n` +
      `Total a pagar: S/. ${subtotal.toFixed(2)}`;
  
    const whatsappLink = `https://wa.me/51978983030?text=${encodeURIComponent(message)}`;
  
    window.open(whatsappLink, "_blank");
  
    clearCart();
    setIsSending(false); // ✅ Habilita el botón nuevamente
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Finalizar pedido</h1>

      

      {/* Lista de productos */}
      <div className="mb-8 overflow-x-auto">
        <h2 className="font-semibold text-lg mb-4">Tu pedido:</h2>
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="py-2 flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <img
                  src={item.imageSrc}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    Cantidad: {item.quantity}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="text-lg font-bold text-green-600">
                      S/. {item.price}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="text-right mt-4 font-bold text-lg">
          Total: S/. {subtotal.toFixed(2)}
        </div>
      </div>
          
          {/* Avisos */}
      <p className="text-center text-sm text-red-600 font-medium mb-2">
        Solo realizamos envíos dentro de Moquegua.
      </p>
      <p className="text-center text-sm text-gray-600 mb-4">
        Los productos se entregan en el color mostrado en la imagen.
      </p>
      {/* Datos del cliente */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Número de teléfono"
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección de entrega (opcional)"
          className="w-full border p-2 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <textarea
          placeholder="Comentarios adicionales (opcional)"
          className="w-full border p-2 rounded"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      {/* Botón WhatsApp */}
      <button
  className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50"
  onClick={handleSubmit}
  disabled={isSending}
>
  {isSending ? "Enviando..." : "Confirmar y enviar por WhatsApp"}
</button>

    </div>
  );
}
