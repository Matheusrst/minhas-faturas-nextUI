import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [cnpjCpf, setCnpjCpf] = useState<string>(""); // Estado para CNPJ ou CPF
  const [error, setError] = useState<string>(""); // Estado para armazenar a mensagem de erro
  const [successMessage, setSuccessMessage] = useState<string>(""); // Estado para a mensagem de sucesso
  const router = useRouter(); // Inicializa o useRouter

  // Verifica se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    const userCpf = document.cookie.replace(
      /(?:(?:^|.*;\s*)userCpf\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    const isLogout = sessionStorage.getItem("logout");
    if (userCpf) {
      // Se o CPF estiver no cookie, redireciona para a página principal
      router.push("/");
    }
    if (isLogout) {
      sessionStorage.removeItem("logout");
    }
  }, [router]);

  // Função para lidar com a mudança no campo CPF/CNPJ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnpjCpf(e.target.value);
  };

  // Função para definir o cookie no navegador
  const setCpfCookie = (cpfCnpj: string): void => {
    document.cookie = `userCpf=${cpfCnpj}; path=/; Secure; SameSite=Strict`;
  };

  // Função para validar CPF
  const validateCpf = (cpf: string): boolean => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Valida CPF com máscara
    const cpfNoMaskRegex = /^\d{11}$/; // Valida CPF sem máscara
    return cpfRegex.test(cpf) || cpfNoMaskRegex.test(cpf);
  };

  // Função para validar CNPJ
  const validateCnpj = (cnpj: string): boolean => {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/; // Valida CNPJ com máscara
    const cnpjNoMaskRegex = /^\d{14}$/; // Valida CNPJ sem máscara
    return cnpjRegex.test(cnpj) || cnpjNoMaskRegex.test(cnpj);
  };

  // Função para realizar o login
  const handleLogin = (): void => {
    // Verifica se é CPF ou CNPJ e valida
    if (!validateCpf(cnpjCpf) && !validateCnpj(cnpjCpf)) {
      setError("Por favor, insira um CPF ou CNPJ válido.");
      setSuccessMessage(""); // Limpa a mensagem de sucesso caso haja erro
      return;
    }

    // Aqui você pode adicionar a lógica de autenticação real
    setSuccessMessage("Login realizado com sucesso!");
    setTimeout(() => {
      setSuccessMessage(""); // Remove a mensagem após 3 segundos
    }, 3000);

    // Define o cookie com o CPF ou CNPJ
    setCpfCookie(cnpjCpf);

    // Adiciona um pequeno intervalo de 1 segundo antes do redirecionamento
    setTimeout(() => {
      router.push("/"); // Redireciona para a página index ("/")
    }, 500);

    setError(""); // Limpa qualquer erro
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-xl font-semibold">Login</h2>

        {/* Mensagem de sucesso */}
        {successMessage && (
          <div className="mb-4 rounded bg-green-500 p-2 text-center text-white">
            {successMessage}
          </div>
        )}

        {/* Mensagem de erro */}
        {error && (
          <div className="mb-4 rounded bg-red-500 p-2 text-center text-white">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="cnpjCpf" className="mb-2 block text-sm font-semibold">
            CPF ou CNPJ
          </label>
          <input
            type="text"
            id="cnpjCpf"
            name="cnpjCpf"
            value={cnpjCpf}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Seu CPF ou CNPJ"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
