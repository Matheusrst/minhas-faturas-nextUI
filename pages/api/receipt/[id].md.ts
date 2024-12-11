import { NextApiRequest, NextApiResponse } from "next";
import { integration } from "@/services/integration";
import { appConfig } from "@/config/app";
import { apiAuth } from "@/middlewares/client-auth";
import { AxiosError } from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (!id) {
      throw new Error("O id do comprovante não foi informado.");
    }

    if (req.method === "POST") {
      const response = await integration.post(`/my-invoices/web/receipt/${id}`, {}, {
          headers: {
            "App-Secret": req.app_token,
            "my-invoices": req.session_token,
          },
        }
      );

      if (response.status === 200 && response.data) {
        return res.status(200).json(response.data);
      } else {
        throw new Error("Erro ao buscar o comprovante.");
      }
    }

    throw new Error(appConfig.errors.back.api.incorrectMethod);
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(400).json({
      status: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
      data: [],
    });
  }
};

export default apiAuth(handler);
