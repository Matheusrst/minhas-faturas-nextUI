import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { nextApi } from "@/services/next-api";

export default function Comprovante() {
  const router = useRouter();
  const { id } = router.query; // Obtemos o ID diretamente da URL
  const [comprovante, setComprovante] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Indica se a página está carregando

  useEffect(() => {
    const fetchComprovante = async () => {
      // Garante que o ID está disponível e o router está pronto
      if (!router.isReady || !id) return;

      try {
        setLoading(true); // Inicia o estado de carregamento
        console.log(`📢 Buscando comprovante com id: ${id}`);

        const response = await nextApi.post(
          `/receipt/${id}`,
          {}, // Corpo vazio para a requisição POST
          {
            headers: {
              "App-Secret": process.env.APP_SECRET,
              "my-invoices": process.env.MY_INVOICES_TOKEN,
            },
          },
        );

        if (response.status === 200 && response.data.status) {
          setComprovante(response.data.data); // Armazena os dados do comprovante
        } else {
          setError("❌ Falha ao recuperar o comprovante.");
        }
      } catch (error) {
        setError("❌ Erro ao buscar o comprovante.");
        console.error("Erro ao buscar o comprovante:", error);
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchComprovante();
  }, [id, router.isReady]); // Certifica-se de que o ID está disponível e o router está pronto

  // Estado de erro
  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Estado de carregamento
  if (loading) {
    return (
      <div className="text-center">
        <p>Carregando comprovante...</p>
      </div>
    );
  }

  // Estado final após o comprovante ter sido carregado
  if (!comprovante) {
    return (
      <div className="text-center">
        <p>Não foi possível carregar o comprovante.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300 px-4">
      <div className="relative flex w-full max-w-sm flex-col justify-between rounded-xl bg-white shadow-md">
        <header className="flex items-center p-6">
          <img
            src="/images/logo-ced-net.png"
            alt="Grupo Cednet"
            className="mr-3 h-10"
          />
        </header>

        <section className="flex-grow px-6">
          <h1 className="text-[1.8rem] font-bold text-black">
            Comprovante de Pagamento
          </h1>
          <p className="mt-2 text-sm text-blue-600">
            {comprovante.payment_date}
          </p>
          <div className="mt-6">
            <p className="text-sm font-semibold text-black">Titular</p>
            <p className="text-sm text-black">{comprovante.titular_name}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">Número do Cartão</p>
            <p className="text-sm text-black">{comprovante.card_number_mask}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">
              Documento do Titular
            </p>
            <p className="text-sm text-black">{comprovante.titular_document}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">Valor Total</p>
            <p className="text-sm text-black">R$ {comprovante.payment_total}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">Parcelas</p>
            <p className="text-sm text-black">
              {comprovante.installments}x de R$ {comprovante.installment_value}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">
              Valor Total das Parcelas
            </p>
            <p className="text-sm text-black">
              R$ {comprovante.installment_value_total}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">Multa</p>
            <p className="text-sm text-black">{comprovante.payment_penalty}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">Taxas</p>
            <p className="text-sm text-black">{comprovante.payment_fees}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">NSU</p>
            <p className="text-sm text-black">{comprovante.nsu}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">TID</p>
            <p className="text-sm text-black">{comprovante.tid}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">Tipo de Cartão</p>
            <p className="text-sm text-black">{comprovante.card_type}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">Nome do Cliente</p>
            <p className="text-sm text-black">{comprovante.client_name}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold text-black">
              Data de Vencimento
            </p>
            <p className="text-sm text-black">{comprovante.due_date}</p>
          </div>
        </section>

        <footer className="absolute bottom-0 left-0 right-0 flex">
          <button
            className="w-1/2 rounded-bl-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
            onClick={() => window.print()} // Função para impressão
          >
            Imprimir
          </button>
          <button
            onClick={() => router.push("/minhas-faturas")} // Redireciona para a página principal (minhas faturas)
            className="w-1/2 rounded-br-lg bg-blue-800 py-3 font-semibold text-white hover:bg-blue-900"
          >
            Pagar outra
          </button>
        </footer>
      </div>
    </div>
  );
}
