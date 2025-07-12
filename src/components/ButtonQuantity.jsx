const ButtonQuantity = ({ quantity, setQuantity }) => {
  const decrement = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1)); // Evita valores menores a 1
  };

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <div className="w-32 border-2 border-gray-400 h-14">
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          onClick={decrement}
          className="text-gray-600 h-full w-20 rounded-l focus:outline-none"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="w-full bg-transparent font-semibold text-md md:text-base text-center cursor-default flex items-center text-gray-700 outline-none focus:outline-none appearance-none border-none"
          value={quantity} // ✅ Se usa `quantity` en lugar del estado interno
          readOnly
        />
        <button
          onClick={increment}
          className="text-gray-600 h-full w-20 rounded-r focus:outline-none"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};

export default ButtonQuantity;
