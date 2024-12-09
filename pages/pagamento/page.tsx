import { useRouter } from "next/router";
import { ItensDetails } from "../pagamento/components/itens";
import { useState } from "react";
import { nextApi } from "@/services/next-api"; // Assumindo que você já tenha configurado isso.
import nookies from "nookies";

export function Page() {
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [formData, setFormData] = useState({
    cardNumber: "",
    titularName: "",
    titularDocument: "",
    cardType: "Mastercard",
    installments: 1,
    expirationDate: "",
    securityCode: "",
    cpfCnpj: "",
  });

  // Função chamada ao submeter o pagamento
  const handlePagarAgora = async (e: React.FormEvent) => {
    e.preventDefault();

    const cookies = nookies.get(null);
    const invoiceIds = JSON.parse(cookies.payment_invoices || "[]"); // Pode ser que seja o mesmo cookie utilizado no "ItensDetails"

    if (invoiceIds.length === 0) {
      alert("Nenhuma fatura foi selecionada.");
      return;
    }

    // Preparando os dados para a requisição
    const paymentData = {
      invoices: invoiceIds, // Agora o array de invoices está preenchido com os IDs das faturas
      card_number_mask: formData.cardNumber,
      titular_name: formData.titularName,
      titular_document: formData.titularDocument,
      card_type: formData.cardType,
      installments: formData.installments,
      expiration_date: formData.expirationDate,
      security_code: formData.securityCode,
    };

    try {
      // Enviar dados para a API de pagamento
      const response = await nextApi.post("/payment", paymentData);

      if (response.status === 200) {
        // Se a resposta for bem-sucedida, redireciona para o comprovante
        router.push("/comprovante");
      } else {
        // Se algo deu errado, exibe uma mensagem de erro
        alert("Erro no pagamento. Tente novamente.");
      }
    } catch (error) {
      // Caso haja algum erro na requisição
      alert("Erro ao processar o pagamento.");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto w-screen xl:w-[90%]">
      {/* Aumenta largura horizontal */}
      <div className="mx-auto flex max-w-6xl flex-col bg-cednetWhite shadow-lg md:mt-24 md:flex-row md:rounded-[.8rem] xl:w-[70rem]">
        <div className="w-full p-6 xl:w-[85%]">
          <img
            src="/images/logo-ced-net.png"
            alt="Cednet Logo"
            className="mb-8 h-10 text-cednetBlue"
          />
          <h2 className="mb-4 text-lg font-semibold text-black">
            Todos os Itens
          </h2>
          <div className="scrollbar-custom h-[24rem] space-y-4 overflow-y-auto">
            <ItensDetails onTotalChange={(total) => setTotalAmount(total)} />
          </div>
          {/* Exibição do valor total */}
          <p className="mt-6 text-left text-lg font-bold text-black">
            R$ {totalAmount.toFixed(2).replace(".", ",")}
          </p>
        </div>

        <form
          className="flex w-full flex-col justify-between bg-gray-200 md:rounded-r-[.8rem] xl:w-[45%]"
          onSubmit={handlePagarAgora}
        >
          <div className="space-y-4 p-6">
            {/* Cartão */}
            <div className="flex items-center justify-center">
              <div className="mb-8 flex h-[8rem] w-[18rem] items-center justify-center rounded-lg bg-gray-800 text-center text-xl font-semibold text-white">
                VISA
              </div>
            </div>
            {/* Formulário */}
            <div>
              <input
                type="text"
                placeholder="Nome Do Titular"
                className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm text-black placeholder-black"
                value={formData.titularName}
                onChange={(e) =>
                  setFormData({ ...formData, titularName: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Número Do Cartão"
                className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm text-black placeholder-black"
                value={formData.cardNumber}
                onChange={(e) =>
                  setFormData({ ...formData, cardNumber: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Vencimento"
                  className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm text-black placeholder-black"
                  value={formData.expirationDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expirationDate: e.target.value })
                  }
                />
              </div>
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Cód. De Segurança"
                  className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm text-black placeholder-black"
                  value={formData.securityCode}
                  onChange={(e) =>
                    setFormData({ ...formData, securityCode: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="CPF/CNPJ Do Titular do Cartão"
                className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm text-black placeholder-black"
                value={formData.titularDocument}
                onChange={(e) =>
                  setFormData({ ...formData, titularDocument: e.target.value })
                }
              />
            </div>
            <div>
              <select
                className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm text-black text-cednetBlack"
                value={formData.installments}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    installments: Number(e.target.value),
                  })
                }
              >
                <option>Selecione uma parcela</option>
                <option value={4}>1x</option>
                <option value={5}>2x</option>
                <option value={6}>3x</option>
                <option value={27}>4x</option>
                <option value={26}>5x</option>
                <option value={25}>6x</option>
                <option value={10}>7x</option>
                <option value={11}>8x</option>
                <option value={12}>9x</option>
                <option value={13}>10x</option>
                <option value={14}>11x</option>
                <option value={15}>12x</option>
              </select>
            </div>
          </div>
          {/* Botão */}
          <button
            type="submit"
            className="mt-6 w-full bg-cednetButton py-3 text-lg font-semibold text-white hover:bg-cednetButtonHover md:rounded-br-[.8rem]"
          >
            Pagar agora
          </button>
        </form>
      </div>
    </div>
  );
}
