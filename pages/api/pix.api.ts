import { appConfig } from "@/config/app";
import { apiAuth } from "@/middlewares/client-auth";
import { integration } from "@/services/integration";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const body = req.body;

            if (!body.id) {
                throw new Error("o ID da fatura não foi passado para a requisição.");
            }

            const response = await integration.post(`/my-invoices/web/invoices/get-pix`, 
                { invoice: body.id }, {
                headers: {
                    "App-Secret": req.app_token,
                    "my-invoices": req.session_token
                }
            });

            if (response.status === 200 && response.data) {
                return res.status(response.status).json(response.data);
            }
        }

        throw new Error(appConfig.errors.back.api.incorrectMethod);
    } catch (error) {
        console.error("Erro na rota /pix", error);

        if (error instanceof AxiosError && error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        if (error instanceof Error) {
            return res.status(400).json({
                status: false,
                message: error.message,
                data: []
            });
        }

        return res.status(400).json({
            status: false,
            message: appConfig.errors.back.api.errorUnknow,
            data: []
        });
    }
};

export default apiAuth(handler);