import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

export function Header() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  // Redireciona para a página de pagamento com os itens selecionados
  const handleCartClick = () => {
    if (selectedItems.length > 0) {
      window.location.href = "/pagamento"; // Redireciona para a página de pagamento
    } else {
      alert("Nenhum item selecionado");
    }
  };

  return (
    <header className="flex items-center justify-between bg-cednetWhite p-4 shadow-md">
      <div className="flex items-center">
        <img src="/images/logo-ced-net.png" alt="cednet" className="mr-2 h-8" />
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="rounded bg-cednetButton px-2 py-1 text-white hover:bg-cednetButtonHover"
          onClick={() => (window.location.href = "")}
        >
          Nova Consulta
        </button>
        <div className="relative">
          <button
            className="flex h-8 w-8 items-center justify-center rounded bg-blue-800 hover:bg-blue-900"
            onClick={handleCartClick} // Redireciona para o pagamento ao clicar
          >
            <ShoppingCart className="h-5 w-5 text-white" />
          </button>
          {selectedItems.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              {selectedItems.length}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
