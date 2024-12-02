import React from "react";
import { useRouter } from "next/router"; // Importando o useRouter

export default function Comprovante() {
  const router = useRouter(); // Inicializando o router

  // Função para redirecionar para a página principal (index)
  const handlePagarOutra = () => {
    router.push("/minhas-faturas"); // Redireciona para a página principal (index)
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300 px-4">
      <div
        className="relative flex w-full max-w-sm flex-col justify-between rounded-xl bg-white shadow-md"
        style={{ margin: "30px 0", height: "calc(100vh - 60px)" }} // Altura fixa com margem de 30px no topo e base
      >
        <header className="flex items-center p-6">
          <img
            src="/images/logo-ced-net.png"
            alt="Grupo Cednet"
            className="mr-3 h-10"
          />
        </header>

        <section className="flex-grow px-6">
          <h1 className="text-[1.8rem] font-bold text-black">
            Comprovante de Pagamento
          </h1>
          <p className="mt-2 text-sm text-blue-600">21 out 2024 às 13:17</p>
          <div className="mt-6">
            <p className="text-sm font-semibold text-black">Titular</p>
            <p className="text-sm text-black">Exemplo de cliente</p>
          </div>
        </section>

        <footer className="absolute bottom-0 left-0 right-0 flex">
          <button
            className="w-1/2 rounded-bl-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
            onClick={() => window.print()} // Função para impressão
          >
            Imprimir
          </button>
          <button
            onClick={handlePagarOutra} // Redireciona para pagar outra
            className="w-1/2 rounded-br-lg bg-blue-800 py-3 font-semibold text-white hover:bg-blue-900"
          >
            Pagar outra
          </button>
        </footer>
      </div>
    </div>
  );
}
