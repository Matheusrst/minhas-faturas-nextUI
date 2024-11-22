import React from "react";
import { ItensDetails } from "./components/itens";

export default function Pagamento() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cednetBlue p-0 md:p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-[.8rem] bg-cednetWhite shadow-lg md:flex-row">
        {/* Coluna da esquerda */}
        <div className="w-full p-6 md:w-3/4">
          <img
            src="/public/images/logo.png"
            alt="Cednet Logo"
            className="mb-8 h-10"
          />
          <h2 className="mb-4 text-lg font-semibold text-black">
            Todos os Itens
          </h2>
          <div className="h-[24rem] space-y-4 overflow-y-auto">
            {/* Lista de itens */}
            <ItensDetails />
            <ItensDetails />
            <ItensDetails />
            <ItensDetails />
            <ItensDetails />
            <ItensDetails />
            <ItensDetails />
            <ItensDetails />
          </div>
          <p className="mt-6 text-left text-lg font-bold text-black">
            R$ 250,00
          </p>
        </div>

        {/* Coluna da direita */}
        <form className="flex w-full flex-col justify-between bg-gray-200 md:w-[30rem]">
          <div className="space-y-4 p-6">
            {/* Cartão */}
            <div className="flex items-center justify-center">
              <div className="mb-8 flex h-[8rem] w-[18rem] items-center justify-center rounded-lg bg-gray-800 text-center text-xl font-semibold text-white">
                VISA
              </div>
            </div>
            {/* Formulário */}
            <div>
              <input
                type="text"
                placeholder="Nome Do Titular"
                className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm placeholder-black"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Número Do Cartão"
                className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm placeholder-black"
              />
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Vencimento"
                  className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm placeholder-black"
                />
              </div>
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Cód. De Segurança"
                  className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm placeholder-black"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="CPF/CNPJ Do Titular do Cartão"
                className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm placeholder-black"
              />
            </div>
            <div>
              <select className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm text-cednetBlack">
                <option>Selecione uma parcela</option>
              </select>
            </div>
          </div>
          {/* Botão */}
          <button className="mt-6 w-full rounded-br-[.8rem] bg-cednetButton py-3 text-lg font-semibold text-white hover:bg-cednetButtonHover">
            Pagar agora
          </button>
        </form>
      </div>
    </div>
  );
}
