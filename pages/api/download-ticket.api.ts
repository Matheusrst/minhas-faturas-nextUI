import { appConfig } from "@/config/app";
import { apiAuth } from "@/middlewares/client-auth";
import { integration } from "@/services/integration";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error(appConfig.errors.back.api.incorrectMethod);
    }

    const { invoice } = req.body;

    if (!invoice) {
      throw new Error("O código da fatura não foi informado.");
    }

    // Requisição para a API externa
    const response = await integration.post(
      `/my-invoices/web/invoices/download-ticket`,
      { invoice },
      {
        headers: {
          "App-Secret": req.app_token,
          "my-invoices": req.session_token,
        },
        responseType: "arraybuffer", 
      }
    );

    if (response.status === 200 && response.data) {
      // Configuração dos cabeçalhos para o arquivo PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="fatura-${invoice}.pdf"`
      );

      // Envio do arquivo PDF diretamente para a resposta
      res.status(200).send(response.data);
    } else {
      throw new Error("Erro ao fazer o download do PDF.");
    }
  } catch (error) {
    console.error("Erro na rota /download-ticket", error);

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
