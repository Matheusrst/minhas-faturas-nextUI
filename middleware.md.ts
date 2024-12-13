import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { integration } from "./services/integration";
import { appConfig } from "./config/app";
import { AxiosError } from "axios";

export async function middleware(request: NextRequest) {
  try {
    const baseAppToken = process.env.INTEGRATIONS_BASE_SECRET as string;
    const sessionTag = process.env.SESSION_TAG as string;

    // Validando se existe o token.
    if (!baseAppToken) {
      throw new Error(
        appConfig.errors.custom.envIsUndefined("INTEGRATIONS_BASE_SECRET"),
      );
    }

    // Validando se existe o token.
    if (!sessionTag) {
      throw new Error(appConfig.errors.custom.envIsUndefined("SESSION_TAG"));
    }

    const clientSession = request.cookies.get(sessionTag);

    if (!clientSession) {
      throw new Error(appConfig.errors.back.server.errorClientSession);
    }

    const response = await integration.get(`/my-invoices/web/validate`, {
      headers: {
        "App-Secret": baseAppToken,
        "my-invoices": clientSession.value,
      },
    });

    if (response.status === 200 && response.data) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (error instanceof Error) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Configuração do matcher para proteger as rotas específicas
export const config = {
  matcher: [
    "/minhas-faturas/:path*",
    "/pagamento/:path*",
    "/comprovante/:path*",
  ], // Roteamento protegido
};
