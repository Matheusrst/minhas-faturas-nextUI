import { useState } from "react";
import { QrCode, CopySlash, CheckCircle } from "lucide-react";

export function PixPayment() {
  const [open, setOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [pixData, setPixData] = useState({
    qrCodeImage: "",
    pixCode: "0002012633B14C...",
    dueDate: "10/12/2024",
    amount: "R$ 100,00",
    total: "R$ 100,00",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(pixData.pixCode);
    alert("Código PIX copiado com sucesso!");
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <QrCode className="h-5 w-5 text-cednetIcons" />
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-96 rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            {!isPaid ? (
              <>
                <h2 className="mb-4 text-center text-lg font-bold text-gray-800">
                  Pagamento via PIX
                </h2>

                <div className="flex justify-center">
                  <img
                    src={pixData.qrCodeImage || "/images/placeholder-qr.png"}
                    alt="QR Code"
                    className="h-40 w-40 rounded-md"
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-gray-600">
                    PIX Copia e Cola
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={pixData.pixCode}
                      className="w-full rounded-l-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600"
                    />
                    <button
                      onClick={handleCopy}
                      className="rounded-r-md bg-blue-600 px-3 text-white hover:bg-blue-700"
                    >
                      <CopySlash size={20} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Data de Vencimento:</span>
                    <span>{pixData.dueDate}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Valor:</span>
                    <span>{pixData.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-800">
                    <span>Total:</span>
                    <span>{pixData.total}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setIsPaid(true)}
                    className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
                  >
                    Simular Pagamento
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <CheckCircle size={80} className="text-green-600" />
                <h2 className="mt-4 text-lg font-bold text-gray-800">
                  Pagamento Confirmado!
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  O pagamento foi concluído com sucesso.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
