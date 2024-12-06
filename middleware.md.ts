import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { integration } from './services/integration';

export function middleware(request: NextRequest) {
  const senssio_tag = process.env.SESSION_TAG as string

  if  (!senssio_tag) {
    console.log('Nome de seção não definido')
    return NextResponse.redirect('/')
  }

  // Verifica se o cookie 'authToken' está presente
  const authToken = request.cookies.get(senssio_tag);
  console.log(senssio_tag)
  
  console.log('Middleware Executado: ', authToken); // Verifica se está entrando no middleware

  // Se o cookie 'authToken' não existir, redireciona para o login
  if (!authToken) {
    console.log('Cookie não encontrado, redirecionando para login');
    return NextResponse.redirect(new URL('/', request.url));
  }

//   const response = await integration.get(`/my-invoices/web/validate`, {
//     headers: {
//         "App-Secret": baseAppToken,
//         "my-invoices": token,
//     }
// })

// if (response.status === 200 && response.data) {
//     return res.status(response.status).json(response.data)
// }

  // Caso o cookie esteja presente, permite que a requisição prossiga
  return NextResponse.next();
}

// Configuração do matcher para proteger as rotas específicas
export const config = {
  matcher: ['/minhas-faturas', '/pagamento', '/comprovante'], // Roteamento protegido
};
