import { useState, useEffect, useRef } from "react";
import { QrCode, CopySlash, CheckCircle } from "lucide-react";
import { nextApi } from "@/services/next-api";
import nookies from "nookies";

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
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 🔥 **Função para buscar os dados do PIX**
  const fetchPixData = async () => {
    setLoading(true);
    setError(null); // Limpa qualquer erro anterior
    try {
      const cookies = nookies.get(null);
      const invoiceIds = JSON.parse(cookies.payment_invoices || "[]");

      if (invoiceIds.length === 0) {
        setError("ID de fatura não encontrado.");
        return;
      }

      const response = await nextApi.post("/pix", { id: invoiceIds[0] });

      if (response.status === 200 && response.data) {
        setPixData(response.data.data); // Atualiza os dados do PIX
      } else {
        setError("Erro ao recuperar os dados do PIX.");
      }
    } catch (error: any) {
      console.error("Erro ao buscar os dados do PIX", error);
      if (error.response && error.response.data) {
        setError(
          error.response.data.message || "Erro ao processar o pagamento",
        );
      } else {
        setError("Erro desconhecido ao buscar os dados do PIX.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔥 **Verificação de pagamento por intervalo**
  const checkPaymentStatus = async () => {
    try {
      const cookies = nookies.get(null);
      const invoiceIds = JSON.parse(cookies.payment_invoices || "[]");

      if (invoiceIds.length === 0) {
        setError("ID de fatura não encontrado.");
        return;
      }

      const response = await nextApi.post("/validate", { id: invoiceIds[0] });

      if (response.status === 200 && response.data) {
        const { status } = response.data.data;

        // Se o status for **false**, o pagamento foi confirmado
        if (!status) {
          clearInterval(intervalRef.current!);
          setPaymentConfirmed(true);
          nookies.destroy(null, "payment_invoices", { path: "/" });
        }
      }
    } catch (error) {
      console.error("Erro ao verificar o status do pagamento", error);
      setError("Erro ao verificar o pagamento. Tente novamente mais tarde.");
    }
  };

  // 🔥 **Função para copiar o código PIX Copia e Cola**
  const handleCopy = () => {
    if (pixData?.pixCopiaECola) {
      navigator.clipboard.writeText(pixData.pixCopiaECola);
      alert("Código PIX copiado com sucesso!");
    }
  };

  // 🔥 **Função para abrir o modal e iniciar o resgate dos dados**
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

  // 🔥 **Inicia o intervalo de verificação do pagamento**
  useEffect(() => {
    if (open) {
      intervalRef.current = setInterval(() => {
        checkPaymentStatus();
      }, 1000); // Verificação a cada 1 segundo
    }

    return () => {
      clearInterval(intervalRef.current!); // Para o intervalo ao desmontar
    };
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
              onClick={handleClose}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            {paymentConfirmed ? (
              <div className="flex flex-col items-center">
                <CheckCircle size={80} className="text-green-600" />
                <h2 className="mt-4 text-lg font-bold text-gray-800">
                  PIX realizado com sucesso!
                </h2>
              </div>
            ) : loading ? (
              <p className="text-center">Carregando dados do PIX...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
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
                    onClick={handleClose}
                    className="w-full rounded-md bg-gray-400 py-2 font-bold text-black hover:bg-gray-500"
                  >
                    Fechar
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
