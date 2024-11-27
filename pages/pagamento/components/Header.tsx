import React from "react";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-cednetWhite p-4 shadow-md">
      <div className="flex items-center">
        <img
          src="../public/images/logo-ced-net.png"
          alt="cednet"
          className="mr-2 h-8"
        />
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
            className="flex h-8 w-16 items-center justify-center rounded bg-[#ff8000] hover:bg-[#cc6600]"
            onClick={() => (window.location.href = "")}
          >
            Faturas
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
