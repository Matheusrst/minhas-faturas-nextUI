import { appConfig } from "@/config/app";
import { apiAuth } from "@/middlewares/client-auth";
import { integration } from "@/services/integration";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({
        status: false,
        message: "Método não permitido. Utilize o método POST.",
      });
    }

    const { invoice } = req.body;

    if (!invoice) {
      return res.status(400).json({
        status: false,
        message: "O código da fatura não foi informado.",
      });
    }

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
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename="fatura-${invoice}.pdf"`);
      return res.status(200).send(response.data);
    } else {
      throw new Error("Erro ao fazer o download do PDF.");
    }
  } catch (error) {
    console.error("Erro na rota /download-ticket", error);

    if (error instanceof AxiosError && error.response) {
      return res.status(error.response.status).json({
        status: false,
        message: error.response.data?.message || "Erro ao tentar baixar a fatura.",
        data: error.response.data || [],
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        status: false,
        message: error.message,
        data: [],
      });
    }

    return res.status(500).json({
      status: false,
      message: appConfig.errors.back.api.errorUnknow,
      data: [],
    });
  }
};

export default apiAuth(handler);
