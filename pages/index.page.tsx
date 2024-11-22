import React from "react";
import { Barcode, CreditCard, QrCode } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-cednetGray">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between bg-cednetWhite p-4 shadow-md">
        <div className="flex items-center">
          <img
            src="../public/images/logo.png" // Substitua pelo caminho do logo
            alt=""
            className="mr-2 h-8"
          />
          <h1 className="text-lg font-bold text-cednetText">GRUPO CEDNET</h1>
        </div>
        <button className="rounded bg-cednetButton px-4 py-2 text-white hover:bg-cednetButtonHover">
          Nova Consulta
        </button>
      </header>

      {/* Conteúdo principal */}
      <main className="flex flex-grow items-center justify-center p-4">
        <div className="w-full max-w-4xl rounded-lg bg-cednetWhite p-6 shadow-md">
          <p className="mb-4 text-lg font-medium text-black">
            Bem vindo, <strong>Luan Vinícius Paiva dos Santos!</strong> 😊
          </p>
          {/* Tabela */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-cednetGray">
                <tr>
                  <th className="border p-2 text-left text-black">
                    <input type="checkbox" />
                  </th>
                  <th className="p-2 text-left text-black">Código</th>
                  <th className="p-2 text-left text-black">Vencimento</th>
                  <th className="p-2 text-left text-black">Valor</th>
                  <th className="p-2 text-center text-black">Ações</th>
                </tr>
              </thead>
              <tbody>
                {Array(7)
                  .fill(null)
                  .map((_, index) => (
                    <tr key={index} className="hover:bg-cednetGray/30">
                      <td className="p-2 text-left text-black">
                        <input type="checkbox" />
                      </td>
                      <td className="p-2 text-black">1288279</td>
                      <td className="p-2 text-black">10/11/2024</td>
                      <td className="p-2 text-black">R$ 19,95</td>
                      <td className="p-2 text-center text-black">
                        <div className="flex items-center justify-center space-x-2">
                          <Barcode className="h-5 w-5 text-cednetIcons" />
                          <CreditCard className="h-5 w-5 text-cednetIcons" />
                          <QrCode className="h-5 w-5 text-cednetIcons" />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
