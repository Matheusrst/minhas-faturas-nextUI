import React from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-[4rem] w-full items-center justify-between bg-cednetWhite p-4 shadow-md">
      <div className="flex items-center">
        <Link href="/minhas-faturas">
          <img
            src="/images/logo-ced-net.png"
            alt="cednet"
            className="mr-2 h-8 cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="rounded bg-cednetButton px-2 py-1 text-white hover:bg-cednetButtonHover"
          onClick={() => {
            // Função para apagar o cookie
            const deleteCookie = (cookieName: string) => {
              document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`;
            };

            // Apaga o cookie 'userCpf' antes de redirecionar
            deleteCookie("userCpf");

            // Redireciona para a página de login
            window.location.href = "/";
          }}
        >
          Nova Consulta
        </button>
        <div className="relative">
          <button
            className="flex items-center justify-center rounded bg-[#ff8000] px-4 py-1 hover:bg-[#cc6600]"
            onClick={() => (window.location.href = "/minhas-faturas")}
          >
            Faturas
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
