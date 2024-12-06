import { useRouter } from "next/router";
import { Barcode, CreditCard, QrCode } from "lucide-react";
import { useSelectedItems } from "@/contexts/SelectedItemsContext";

interface TableRowProps {
  invoice: InvoiceInterface;
}

export function TableRow({ invoice }: TableRowProps) {
  const router = useRouter();
  const { toggleItem, isItemSelected } = useSelectedItems();

  const handleIconClick = (id: number) => {
    router.push("/pagamento");
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
        {invoice.data_vencimento}
      </td>
      <td className="whitespace-nowrap p-2 text-black">R$ {invoice.valor}</td>
      <td className="whitespace-nowrap p-2 text-center text-black">
        <div className="flex items-center justify-center space-x-2">
          <Barcode className="h-5 w-5 text-cednetIcons" />
          <CreditCard
            className="h-5 w-5 cursor-pointer text-cednetIcons"
            onClick={() => handleIconClick(invoice.id)}
          />
          <QrCode className="h-5 w-5 text-cednetIcons" />
        </div>
      </td>
    </tr>
  );
}
