import React, { useState } from "react";
import { Barcode, CreditCard, QrCode, ShoppingCart } from "lucide-react";

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const handleIconClick = (index: number) => {
    console.log(`Redirecionando para pagamento do item ${index}`);
    window.location.href = `/pagamento?item=${index}`;
  };

  const handleGoToPayment = () => {
    window.location.href = "/pagamento";
  };

  return (
    <div className="flex min-h-screen flex-col bg-cednetGray">
      <header className="flex items-center justify-between bg-cednetWhite p-4 shadow-md">
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
              className="flex h-8 w-8 items-center justify-center rounded bg-blue-800 hover:bg-blue-900"
              onClick={() => (window.location.href = "")}
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

      <main className="sticky top-0 flex flex-grow items-center justify-center px-4 pt-4 md:pb-[20rem]">
        <div className="w-full max-w-4xl rounded-lg bg-cednetWhite p-6 shadow-md">
          <p className="mb-4 text-lg font-medium text-black">
            Bem vindo,
            <br /> <strong>Luan Vinícius Paiva dos Santos!</strong> 😊
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-cednetGray">
                <tr>
                  <th className="border p-2 text-left text-black">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          setSelectedItems(
                            Array.from({ length: 7 }, (_, i) => i),
                          );
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                    />
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
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>
                      <td className="p-2 text-black">1288279</td>
                      <td className="p-2 text-black">10/11/2024</td>
                      <td className="p-2 text-black">R$ 19,95</td>
                      <td className="p-2 text-center text-black">
                        <div className="flex items-center justify-center space-x-2">
                          <Barcode className="h-5 w-5 text-cednetIcons" />
                          <CreditCard
                            className="h-5 w-5 cursor-pointer text-cednetIcons"
                            onClick={() => handleIconClick(index)}
                          />
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

      {selectedItems.length > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-cednetBlue p-2 text-center">
          <button
            className="rounded bg-cednetBlue px-4 py-2 font-semibold text-cednetWhite"
            onClick={handleGoToPayment}
          >
            Ir para o Pagamento...
          </button>
        </footer>
      )}
    </div>
  );
}
