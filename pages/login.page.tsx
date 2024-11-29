import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [cpfCnpj, setCpfCnpj] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Remover pontuação e validar CPF/CNPJ
    const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, "");
    const isCpfCnpjValid = /^\d{11}$|^\d{14}$/.test(cleanedCpfCnpj);
    if (!isCpfCnpjValid) {
      alert("Digite um CPF ou CNPJ válido!");
      return;
    }

    // Aqui você pode substituir o "mocked-token" por um token real gerado pela API
    const token = "mocked-token"; // Substituir pelo token real da API
    Cookies.set("token", token, { expires: 1 }); // Define o cookie por 1 dia

    // Redireciona para a página principal após o login
    router.push("/"); // Ou qualquer outra página que seja a página inicial
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="cpfCnpj"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              CPF ou CNPJ
            </label>
            <input
              type="text"
              id="cpfCnpj"
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
              placeholder="Digite seu CPF ou CNPJ"
              className="w-full rounded border border-gray-300 p-3 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
