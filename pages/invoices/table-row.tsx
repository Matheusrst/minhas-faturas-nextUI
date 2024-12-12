import { useState } from "react";
import { useRouter } from "next/router";
import { Barcode, CreditCard, QrCode } from "lucide-react";
import { useSelectedItems } from "@/contexts/SelectedItemsContext";
import nookies from "nookies";
import { PixPayment } from "../pix/components/PixPayment";
import { nextApi } from "@/services/next-api"; // Importa a instância de requisição para a API

interface TableRowProps {
  invoice: InvoiceInterface;
}

export function TableRow({ invoice }: TableRowProps) {
  const router = useRouter();
  const { toggleItem, isItemSelected } = useSelectedItems();
  const [toastMessage, setToastMessage] = useState<string | null>(null); // Estado para controlar o aviso de toast

  const handleIconClick = (id: number) => {
    nookies.set(null, "payment_invoices", JSON.stringify([id]), {
      path: "/",
    });
    router.push("/pagamento");
  };

  const handlePixClick = (id: number) => {
    nookies.set(null, "payment_invoices", JSON.stringify([id]), {
      path: "/",
    });
  };

  const handleDownloadPdf = async (id: number) => {
    try {
      const response = await nextApi.post(
        "/download-ticket",
        { invoice: id },
        {
          responseType: "blob", // Define o tipo de resposta como 'blob' para receber o PDF
        },
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `fatura-${id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Exibe o aviso de sucesso
        setToastMessage("Fatura PDF baixada com sucesso!");
      } else {
        console.error("Erro ao fazer o download do PDF");
        setToastMessage("Erro ao fazer o download do PDF. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao fazer o download do PDF", error);
      setToastMessage("Erro ao fazer o download do PDF. Verifique a conexão.");
    }
  };

  return (
    <tr className="hover:bg-cednetGray/30">
      <td className="whitespace-nowrap p-2 text-left text-black">
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={isItemSelected(invoice.id)}
          onChange={() => toggleItem(invoice.id)}
        />
      </td>
      <td className="whitespace-nowrap p-2 text-black">{invoice.id}</td>
      <td className="whitespace-nowrap p-2 text-black">
        {new Date(invoice.data_vencimento).toLocaleDateString("pt-BR")}
      </td>
      <td className="whitespace-nowrap p-2 text-black">R$ {invoice.valor}</td>
      <td className="whitespace-nowrap p-2 text-center text-black">
        <div className="flex items-center justify-center space-x-2">
          <div>
            <Barcode
              className="h-5 w-5 cursor-pointer text-cednetIcons"
              onClick={() => handleDownloadPdf(invoice.id)} // Inicia o download do PDF
            />
            {toastMessage && (
              <div
                className={`fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded-md p-4 text-white ${
                  toastMessage.includes("sucesso")
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
                style={{
                  zIndex: 9999, // Garante que o toast ficará visível acima dos outros itens
                  transition: "opacity 0.5s ease", // Suaviza a entrada/saída do toast
                }}
              >
                {toastMessage}
              </div>
            )}
          </div>
          <CreditCard
            className="h-5 w-5 cursor-pointer text-cednetIcons"
            onClick={() => handleIconClick(invoice.id)}
          />
          <div
            className="h-5 w-5 text-cednetIcons"
            onClick={() => handlePixClick(invoice.id)}
          >
            <PixPayment />
          </div>
        </div>
      </td>
    </tr>
  );
}
