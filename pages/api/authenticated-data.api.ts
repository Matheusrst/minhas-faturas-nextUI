import { appConfig } from "@/config/app";
import { apiAuth } from "@/middlewares/client-auth";
import { integration } from "@/services/integration";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      throw new Error(appConfig.errors.back.api.incorrectMethod);
    }

    // Requisição para a API externa
    const response = await integration.post(
      `/my-invoices/web/authenticated-data`,
      {}, // O body pode ser vazio conforme informado
      {
        headers: {
          "App-Secret": req.app_token, // Token da aplicação
          "my-invoices": req.session_token, // Token da sessão do usuário
        },
      },
    );

    if (response.status === 200 && response.data) {
      // Retorna os dados para o frontend
      return res.status(200).json(response.data);
    } else {
      throw new Error("Erro ao recuperar os dados autenticados.");
    }
  } catch (error) {
    console.error("Erro na rota /authenticated-data", error);

    if (error instanceof AxiosError && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    if (error instanceof Error) {
      return res.status(400).json({
        status: false,
        message: error.message,
        data: [],
      });
    }

    return res.status(400).json({
      status: false,
      message: appConfig.errors.back.api.errorUnknow,
      data: [],
    });
  }
};

export default apiAuth(handler);
