import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verifica se o cookie 'authToken' está presente
  const authToken = request.cookies.get('userCpf');
  
  console.log('Middleware Executado: ', authToken); // Verifica se está entrando no middleware

  // Se o cookie 'authToken' não existir, redireciona para o login
  if (!authToken) {
    console.log('Cookie não encontrado, redirecionando para login');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Caso o cookie esteja presente, permite que a requisição prossiga
  return NextResponse.next();
}

// Configuração do matcher para proteger as rotas específicas
export const config = {
  matcher: ['/minhas-faturas', '/pagamento', '/comprovante'], // Roteamento protegido
};
