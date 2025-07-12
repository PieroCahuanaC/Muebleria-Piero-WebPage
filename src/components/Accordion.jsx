import { useState } from "react";
import "/src/styles/global.css";
const Accordion = ({ product }) => {
  const [open, setOpen] = useState(null);

  const toggleAccordion = (index) => {
    setOpen(open === index ? null : index);
  };
  if (!product) {
    return (
      <p className="text-red-500">Error: No se ha recibido el producto.</p>
    );
  }
  const hasDimensions = product.Dimension && product.Dimension.height !== null;
  return (
    <div className="max-w-[42rem] bg-white pt-3  lg:ml-0">
      <div id="accordion-collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="flex items-center justify-between p-5 w-full font-medium text-left border border-gray-400  border-b-0     dark:hover:bg-gray-100 -xl"
            onClick={() => toggleAccordion(1)}
            aria-expanded={open === 1}
            aria-controls="accordion-collapse-body-1"
          >
            <span>Características principales</span>
            <svg
              className={`w-6 h-6 shrink-0 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </h2>
        {open === 1 && (
          <div
            id="accordion-collapse-body-1"
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-5 border border-gray-300 dark:bg-gray-9700 border-b-0">
              <ul className="mb-2">
                <li>
                  {" "}
                  <span className="font-semibold">Material:</span>{" "}
                  {product?.material || "Material no especificado"}
                </li>
                <li>
                  <span className="font-semibold">Estilo:</span> Urbano
                </li>
                <li>
                  <span className="font-semibold">Piezas:</span> 1
                </li>
                <li>
                  <span className="font-semibold">Procedencia:</span> Perú
                </li>
                <li>
                  <span className="font-semibold">Requiere armado:</span> No
                </li>
              </ul>
            </div>
          </div>
        )}

        <h2 id="accordion-collapse-heading-2">
          <button
            type="button"
            className="flex items-center justify-between p-5 w-full font-medium border border-gray-400 text-left hover:bg-gray-100 dark:hover:bg-gray-100 border-b"
            onClick={() => toggleAccordion(2)}
            aria-expanded={open === 2}
            aria-controls="accordion-collapse-body-2"
          >
            <span>Dimensiones</span>
            <svg
              className={`w-6 h-6 shrink-0 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </h2>
        {open === 2 && (
          <div
            id="accordion-collapse-body-2"
            aria-labelledby="accordion-collapse-heading-2"
          >
            <div className="p-5 border border-gray-200 border-b">
              {hasDimensions ? (
                <p className="mb-2">
                  <span className="font-semibold">Altura:</span>{" "}
                  {product.Dimension.height} cm <br />
                  <span className="font-semibold">Ancho:</span>{" "}
                  {product.Dimension.width} cm <br />
                  <span className="font-semibold">Largo:</span>{" "}
                  {product.Dimension.length} cm
                </p>
              ) : (
                <p className="text-gray-500">Dimensiones no disponibles</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
