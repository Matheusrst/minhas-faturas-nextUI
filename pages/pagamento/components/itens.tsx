import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import nookies from "nookies";
import { AxiosError } from "axios";
import { nextApi } from "@/services/next-api";

interface InvoiceDetails {
  invoice_id: number;
  contrato: string;
  valor: string;
  penalty: string;
  fees: string;
  value_total: string;
}

interface Contract {
  id: number;
  contrato: string;
}

export function ItensDetails() {
  const [invoices, setInvoices] = useState<InvoiceDetails[]>([]); // 🟢 Estado inicial como array vazio
  const [error, setError] = useState<string | null>(null); // 🟢 Mensagem de erro

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const cookies = nookies.get(null);
        const invoiceIds = JSON.parse(cookies.payment_invoices || "[]");

        if (invoiceIds.length === 0) {
          throw new Error("Nenhuma fatura foi selecionada.");
        }

        console.log("📢 Enviando IDs para API: ", invoiceIds);

        const response = await nextApi.post("/calculate", {
          invoices: invoiceIds, // ✅ Enviando os IDs das faturas
        });

        console.log("🚀 Resposta da API: ", response.data); // ✅ Verifica o formato da resposta da API

        const { withContracts, contracts } = response.data.data;

        if (Array.isArray(withContracts) && withContracts.length > 0) {
          // 🟢 Faz a relação entre as faturas (withContracts) e os contratos
          const invoicesWithContracts = withContracts.map((invoice) => {
            const contract = contracts.find(
              (contract) => contract.id === invoice.id_contrato,
            );

            return {
              ...invoice,
              contrato: contract
                ? contract.contrato
                : "Contrato não identificado",
            };
          });

          setInvoices(invoicesWithContracts); // 🟢 Define o estado de invoices
        } else {
          console.error("Formato de resposta inesperado", response.data);
          throw new Error("Erro ao carregar as faturas.");
        }
      } catch (error) {
        console.error("❌ Erro ao carregar as faturas:", error);

        if (error instanceof AxiosError && error.response) {
          setError(error.response.data.message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Erro desconhecido.");
        }
      }
    };

    loadInvoices();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (invoices.length === 0) {
    return <p>Carregando faturas...</p>;
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.invoice_id}
          className="flex items-start space-x-4 rounded-lg bg-cednetGray p-4"
        >
          <Globe className="h-6 w-6 text-black" />
          <div>
            <p className="text-xs font-medium text-black">
              <strong>Contrato:</strong> {invoice.contrato}
            </p>

            <div className="flex space-x-36 font-bold sm:space-x-36 md:space-x-20 lg:space-x-[25rem]">
              <span className="text-[.7rem] text-black">
                Valor: R$ {invoice.valor}
              </span>
              <span className="text-[.7rem] text-black">
                Juros: R$ {invoice.fees}
              </span>
            </div>

            <div className="flex space-x-36 font-bold sm:space-x-36 md:space-x-20 lg:space-x-[25.2rem]">
              <span className="text-[.7rem] text-black">
                Total: R$ {invoice.value_total}
              </span>
              <span className="text-[.7rem] text-black">
                Multa: R$ {invoice.penalty}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
