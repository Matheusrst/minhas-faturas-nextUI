import { Globe } from "lucide-react";

export function ItensDetails() {
  return (
    <div className="flex items-start space-x-4 rounded-lg bg-cednetGray p-4">
      <Globe className="h-6 w-6 text-black" />
      <div>
        <p className="text-xs font-medium text-black">
          <strong>Contrato 31398</strong> - CRM FIBRA COLABORADORES - 200M (2º
          PONTO)
        </p>

        <div className="flex space-x-36 font-bold sm:space-x-36 md:space-x-20 lg:space-x-[25rem]">
          <span className="text-[.7rem] text-black">Valor: R$ 50,00</span>
          <span className="text-[.7rem] text-black">Juros: R$ 50.00</span>
        </div>

        <div className="flex space-x-36 font-bold sm:space-x-36 md:space-x-20 lg:space-x-[25.2rem]">
          <span className="text-[.7rem] text-black">Total: R$ 50,00</span>
          <span className="text-[.7rem] text-black">Multa: R$ 50,00</span>
        </div>
      </div>
    </div>
  );
}
