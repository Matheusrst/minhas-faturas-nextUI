import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas protegidas
const protectedRoutes = ["/", "/pagamento", "/comprovante"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Obtém o token do cookie

  console.log('Token encontrado:', token); // Verifique se o token está sendo acessado

  // Verifica se a rota é protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Se não houver token, redireciona para o login
    if (!token) {
      console.log("Token não encontrado, redirecionando para o login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Simula validação do token (substitua por uma validação real)
      const isValid = validateToken(token);
      console.log("Token válido?", isValid); // Log para verificar a validade

      if (!isValid) {
        console.log("Token inválido, redirecionando para o login");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (error) {
      console.log("Erro ao validar token:", error);
      return NextResponse.redirect(new URL("/login", req.url)); // Redireciona em caso de erro
    }
  }

  return NextResponse.next(); // Continua para a rota caso o token seja válido
}

// Função para validar o token (substitua pela sua lógica de validação real)
function validateToken(token: string): boolean {
  // Exemplo: considerar tokens "mocked-token" válidos
  return token === "mocked-token"; // Troque esta validação pela lógica de JWT real
}

// Configuração do middleware
export const config = {
  matcher: ["/", "/pagamento", "/comprovante"], // Aplica o middleware somente nas rotas protegidas
};
