import { ShoppingCart } from "lucide-react";
import { useSelectedItems } from "@/contexts/SelectedItemsContext";
import Link from "next/link";
import nookies from "nookies";
import { nextApi } from "@/services/next-api"; // Instância do Axios para fazer a requisição de sign-out

export function Header() {
  const { selectedItems } = useSelectedItems();

  const handleGoToPayment = () => {
    if (selectedItems.length > 0) {
      nookies.set(null, "payment_invoices", JSON.stringify(selectedItems), {
        path: "/",
      });

      // Redirecionar o usuário para a página de pagamento
      window.location.href = "/pagamento";
    } else {
      alert("Por favor, selecione ao menos um item para prosseguir.");
    }
  };

  const handleSignOut = async () => {
    try {
      // Realiza a requisição POST para a API de sign-out, passando os cookies diretamente
      const response = await nextApi.post("/sign-out");

      nookies.destroy(null, "payment_invoices", { path: "/" });
      nookies.destroy(null, "my-invoices", { path: "/" });

      if (response.status === 200) {
        console.log("Logout bem-sucedido!");

        // Limpa os cookies relacionados ao login do usuário
        nookies.destroy(null, "payment_invoices", { path: "/" });
        nookies.destroy(null, "my-invoices", { path: "/" });

        // Após o logout, redireciona para a página inicial
        window.location.href = "/";
      } else {
        console.error("Erro ao tentar realizar o sign-out.");
      }
    } catch (error) {
      console.error("Erro ao realizar o sign-out:", error);
    }
  };

  return (
    <header className="flex items-center justify-between bg-cednetWhite p-4 shadow-md">
      <div className="flex items-center">
        <Link href="/minhas-faturas">
          <img
            src="/images/logo-ced-net.png"
            alt="cednet"
            className="mr-2 h-8 cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="rounded bg-cednetButton px-2 py-1 text-white hover:bg-cednetButtonHover"
          onClick={handleSignOut} // Chama a função de sign-out
        >
          Nova Consulta
        </button>
        <div className="relative">
          <button
            className="mr-4 flex h-8 w-8 items-center justify-center rounded bg-blue-800 hover:bg-blue-900"
            onClick={handleGoToPayment}
          >
            <ShoppingCart className="h-5 w-5 text-white" />
          </button>
          {selectedItems.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              {selectedItems.length}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
