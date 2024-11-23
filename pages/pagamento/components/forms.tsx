export function formsDetails() {
  return (
    <form className="flex w-full flex-col justify-between bg-gray-200 md:w-[30rem]">
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
            className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm placeholder-black"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Número Do Cartão"
            className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm placeholder-black"
          />
        </div>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Vencimento"
              className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm placeholder-black"
            />
          </div>
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Cód. De Segurança"
              className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm placeholder-black"
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="CPF/CNPJ Do Titular do Cartão"
            className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm placeholder-black"
          />
        </div>
        <div>
          <select className="w-full rounded border border-gray-300 bg-cednetWhite p-3 text-sm text-cednetBlack">
            <option>Selecione uma parcela</option>
          </select>
        </div>
      </div>
      {/* Botão */}
      <button className="mt-6 w-full rounded-br-[.8rem] bg-cednetButton py-3 text-lg font-semibold text-white hover:bg-cednetButtonHover">
        Pagar agora
      </button>
    </form>
  );
}
