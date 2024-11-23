import React from "react";
import { ItensDetails } from "./components/itens";

export default function Pagamento() {
  return (
    <div className="relative h-screen w-screen bg-cednetBlue p-0 md:p-4">
      {/* Faixa branca na parte inferior */}
      <div className="bg-white md:absolute md:bottom-0 md:left-0 md:h-[23.1%] md:w-full"></div>

      <div className="flex max-w-5xl flex-col bg-cednetWhite shadow-lg md:fixed md:left-[50%] md:top-[50%] md:translate-x-[-50%] md:translate-y-[-50%] md:flex-row md:rounded-[.8rem]">
        {/* Coluna da esquerda */}
        <div className="w-full p-6 md:w-3/4">
          <img
            src="/public/images/logo.png"
            alt="Cednet Logo"
            className="mb-8 h-10 text-cednetBlue"
          />
          <h2 className="mb-4 text-lg font-semibold text-black">
            Todos os Itens
          </h2>
          <div className="scrollbar-custom h-[24rem] space-y-4 overflow-y-auto">
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
        <form className="flex w-full flex-col justify-between bg-gray-200 md:w-[30rem] md:rounded-r-[.8rem]">
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
          <button className="mt-6 w-full bg-cednetButton py-3 text-lg font-semibold text-white hover:bg-cednetButtonHover md:rounded-br-[.8rem]">
            Pagar agora
          </button>
        </form>
      </div>
    </div>
  );
}
