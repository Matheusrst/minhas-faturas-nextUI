import { useState, useEffect } from "react";
import { QrCode, CopySlash, CheckCircle } from "lucide-react";
import { nextApi } from "@/services/next-api";
import nookies from "nookies"; // Importar nookies para recuperar o ID da fatura

interface PixData {
  qrCode: string;
  imagemSrc: string;
  expiracaoPix: string;
  solicitacaoPagador: string;
  valor: {
    original: string;
    abatimento: any[];
    desconto: any[];
    juros: {
      valorPerc: string;
      modalidade: number;
    };
    multa: {
      valorPerc: string;
      modalidade: number;
    };
  };
  devedor: string;
  pixCopiaECola: string;
  dataDeVencimento: string;
}

export function PixPayment() {
  const [open, setOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);

  // Função para buscar os dados do PIX
  const fetchPixData = async () => {
    setLoading(true);
    try {
      // Lê o ID da fatura do cookie
      const cookies = nookies.get(null);
      const invoiceIds = JSON.parse(cookies.payment_invoices || "[]");

      if (invoiceIds.length === 0) {
        console.error("ID de fatura não encontrado.");
        return;
      }

      const response = await nextApi.post("/pix", { id: invoiceIds[0] });

      if (response.status === 200 && response.data) {
        setPixData(response.data.data); // Atualiza os dados do PIX
      } else {
        console.error("Erro ao buscar os dados do PIX");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados do PIX", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para copiar o código PIX Copia e Cola
  const handleCopy = () => {
    if (pixData?.pixCopiaECola) {
      navigator.clipboard.writeText(pixData.pixCopiaECola);
      alert("Código PIX copiado com sucesso!");
    }
  };

  // Função para abrir o modal e iniciar o resgate dos dados
  const handleOpen = () => {
    setOpen(true);
    setPixData(null); // Limpa os dados do PIX ao abrir o modal
    fetchPixData(); // Chama a função de busca assim que o modal abre
  };

  // Fechar o modal, limpar os dados do PIX e deletar o cookie
  const handleClose = () => {
    setOpen(false);
    setPixData(null); // Limpa os dados do PIX quando fechar o modal
    nookies.destroy(null, "payment_invoices", { path: "/minhas-faturas" }); // Deleta o cookie ao fechar o modal
  };

  // Usando useEffect para garantir que o cookie seja lido assim que o modal é aberto
  useEffect(() => {
    if (open) {
      fetchPixData(); // Garantir que a função de buscar os dados seja chamada quando o modal abrir
    }
  }, [open]);

  return (
    <div>
      <button onClick={handleOpen}>
        <QrCode className="h-5 w-5 text-cednetIcons" />
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-96 rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={handleClose} // Fecha o modal e deleta o cookie
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            {loading ? (
              <p className="text-center">Carregando dados do PIX...</p>
            ) : pixData ? (
              <>
                <h2 className="mb-4 text-center text-lg font-bold text-gray-800">
                  Pagamento via PIX
                </h2>

                <div className="flex justify-center">
                  <img
                    src={pixData.imagemSrc}
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
                      value={pixData.pixCopiaECola}
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
                    <span>{pixData.dataDeVencimento}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Valor:</span>
                    <span>R$ {pixData.valor.original}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-800">
                    <span>Total:</span>
                    <span>R$ {pixData.valor.original}</span>
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
              <p className="text-center text-red-500">
                Erro ao carregar os dados do PIX
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
