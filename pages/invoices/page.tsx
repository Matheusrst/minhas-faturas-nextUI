import { nextApi } from "@/services/next-api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TableRow } from "./table-row";
import Link from "next/link";
import nookies from "nookies";
import { useSelectedItems } from "@/contexts/SelectedItemsContext";

export function Page() {
  const router = useRouter();
  const { selectedItems, selectAllItems, clearAllItems } = useSelectedItems();

  const [params, setParams] = useState<FiltersProps>(() => ({
    fields: "id,valor,data_vencimento,status",
    paginate: 20,
    order_by: "fn_areceber.data_vencimento",
    order: "asc", //ou desc
    filters: [],
  }));

  const { data: invoices } = useQuery({
    queryKey: ["invoices", params, router.query],
    queryFn: async () => {
      try {
        const response = await nextApi.post<
          ActionsResponse<ApiResponse<InvoiceInterface[]>>
        >(`/invoices`, params);

        if (response.status === 200) {
          return response.data;
        }

        return null;
      } catch (error) {
        console.log(error);

        if (error instanceof AxiosError && error.response) {
          const data = error.response.data as ActionsResponse<[]>;
          return null;
        }

        if (error instanceof Error) {
          return null;
        }

        return null;
      }
    },
  });

  useEffect(() => {
    if (router.query.paginate) {
      setParams((state) => ({
        ...state,
        paginate: router.query.paginate as string,
      }));
    } else {
      setParams((state) => ({
        ...state,
        paginate: 20,
      }));
    }
  }, [router.query]);

  if (!invoices) {
    return invoices;
  }

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = invoices.data.data.map((invoice) => invoice.id);
      selectAllItems(allIds);
    } else {
      clearAllItems();
    }
  };

  const handleGoToPayment = () => {
    if (selectedItems.length > 0) {
      nookies.set(null, "payment_invoices", JSON.stringify(selectedItems), {
        path: "/",
      });

      // Redirecionar para a página de pagamento
      window.location.href = "/pagamento";
    } else {
      alert("Por favor, selecione ao menos um item para prosseguir.");
    }
  };

  return (
    <div className="mt-6 flex w-[75vw] items-center justify-center xl:w-[70vw]">
      <div className="w-full max-w-[70vw] rounded-lg bg-cednetWhite p-6 shadow-md">
        <p className="mb-4 text-[1rem] font-medium text-black">
          Bem vindo,
          <br /> <strong>Luan Vinícius Paiva dos Santos!</strong> 😊
        </p>
        <div className="scrollbar-custom max-h-[70vh] overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-cednetGray">
              <tr>
                <th className="border p-2 text-left text-black">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    onChange={handleSelectAll}
                    checked={
                      invoices.data.data.length > 0 &&
                      selectedItems.length === invoices.data.data.length
                    }
                  />
                </th>
                <th className="p-2 text-left text-black">Código</th>
                <th className="p-2 text-left text-black">Vencimento</th>
                <th className="p-2 text-left text-black">Valor</th>
                <th className="p-2 text-center text-black">Ações</th>
              </tr>
            </thead>

            <tbody>
              {invoices.data.data.map((invoice, index) => (
                <TableRow key={index} invoice={invoice} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <button
          onClick={handleGoToPayment} // ✅ Salva no cookie e redireciona
          className="fixed bottom-0 left-0 right-0 cursor-pointer rounded-none bg-cednetBlue px-4 py-4 text-center font-semibold text-cednetWhite hover:bg-cednetButtonHover"
        >
          Ir para o Pagamento...
        </button>
      )}
    </div>
  );
}
