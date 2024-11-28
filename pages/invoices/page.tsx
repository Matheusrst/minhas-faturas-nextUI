import { useState } from "react";
import { Barcode, CreditCard, QrCode } from "lucide-react";

export function Page() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  // Marcar ou desmarcar todos os itens
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItems(Array.from({ length: 7 }, (_, i) => i)); // Seleciona todos os itens
    } else {
      setSelectedItems([]); // Desmarca todos os itens
    }
  };

  const handleIconClick = (index: number) => {
    console.log(`Redirecionando para pagamento do item ${index}`);
    window.location.href = `/pagamento?item=${index}`;
  };

  const handleGoToPayment = () => {
    window.location.href = "/pagamento";
  };

  const isAllSelected = selectedItems.length === 7;

  return (
    <div className="mt-4 w-[75vw] xl:w-[65vw]">
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
                    checked={isAllSelected}
                    onChange={handleSelectAll} // Chama a função para selecionar todos
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
                        checked={selectedItems.includes(index)} // Verifica se o item está selecionado
                        onChange={() => handleCheckboxChange(index)} // Chama a função para marcar/desmarcar
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

      {/* Botão fixo no rodapé */}
      {selectedItems.length > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-cednetBlue p-2 text-center">
          <button
            className="rounded bg-cednetBlue px-4 py-2 font-semibold text-cednetWhite hover:bg-cednetButtonHover"
            onClick={handleGoToPayment}
          >
            Ir para o Pagamento...
          </button>
        </footer>
      )}
    </div>
  );
}
