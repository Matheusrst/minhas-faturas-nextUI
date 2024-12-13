import { useState } from "react";
import { useRouter } from "next/router";
import { Barcode, CreditCard, QrCode } from "lucide-react";
import { useSelectedItems } from "@/contexts/SelectedItemsContext";
import nookies from "nookies";
import { PixPayment } from "../pix/components/PixPayment";

interface TableRowProps {
  invoice: InvoiceInterface;
}

export function TableRow({ invoice }: TableRowProps) {
  const router = useRouter();
  const { toggleItem, isItemSelected } = useSelectedItems();

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

  // Função para abrir a fatura em uma nova aba
  const handleOpenPdf = (id: number) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/download-ticket";
    form.target = "_blank"; // Abre em uma nova aba

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "invoice";
    input.value = id.toString();

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form); // Remove o formulário após o envio
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
          <Barcode
            className="h-5 w-5 cursor-pointer text-cednetIcons"
            onClick={() => handleOpenPdf(invoice.id)} // Abre o PDF na nova aba
          />
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
