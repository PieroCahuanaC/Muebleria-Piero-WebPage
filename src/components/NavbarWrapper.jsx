// src/components/NavbarWrapper.jsx
import CartButton from "./Cartbutton.jsx";

export default function NavbarWrapper() {
  return (
    <div className="flex justify-end items-center gap-4">
      <CartButton />
    </div>
  );
}
