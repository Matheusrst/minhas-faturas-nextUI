import { useEffect, useState, useRef } from "react";
import { nextApi } from "@/services/next-api";
import nookies from "nookies";

interface ValidatePaymentProps {
  onPaymentSuccess: () => void; // Função de callback quando o pagamento for concluído
}

export function ValidatePayment({ onPaymentSuccess }: ValidatePaymentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

        // Se o status for falso, o pagamento foi confirmado
        if (!status) {
          clearInterval(intervalRef.current!);
          onPaymentSuccess(); // Chama o callback de sucesso
          nookies.destroy(null, "payment_invoices", { path: "/" }); // Remove o cookie
        }
      }
    } catch (error) {
      console.error("Erro ao verificar o status do pagamento", error);
      setError("Erro ao verificar o pagamento. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    setLoading(true);
    intervalRef.current = setInterval(() => {
      checkPaymentStatus();
    }, 1000); // Verifica o status de pagamento a cada 1 segundo

    return () => {
      clearInterval(intervalRef.current!); // Para a verificação quando o componente for desmontado
    };
  }, []);

  return (
    <div>
      {loading && <p>Verificando pagamento...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
}
