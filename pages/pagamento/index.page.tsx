// Pagamento.tsx
import React from "react";
import { useRouter } from "next/router";
import PagamentoCard from "./components/PagamentoCard";
import Header from "./components/Header"; // Importando o componente

export default function Pagamento() {
  const router = useRouter();

  const handlePagarAgora = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/comprovante"); // Redireciona para a página de comprovante
  };

  return (
    <div>
      <Header />
      <PagamentoCard handlePagarAgora={handlePagarAgora} />
    </div>
  );
}
