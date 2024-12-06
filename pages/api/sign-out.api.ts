import { appConfig } from "@/config/app";
import { integration } from "@/services/integration";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const baseAppToken = process.env.INTEGRATIONS_BASE_SECRET as string;

        // Validando se existe o token. 
        if (!baseAppToken) {
            throw new Error(appConfig.errors.custom.envIsUndefined('INTEGRATIONS_BASE_SECRET'))
        }

        
        if  (req.method === 'POST') {
            const body = req.body

            const response = await integration.post(`/my-invoices/web/sign-out`, body, {
                headers: {
                    "App-Secret": baseAppToken
                }
            })

            if (response.status === 200 && response.data) {
                return res.status(response.status).json(response.data)
            }
        }

        throw new Error(appConfig.errors.back.api.incorrectMethod)
    } catch (error) {
        console.error(error);

        if (error instanceof AxiosError && error.response) {
            return res.status(error.response.status).json(error.response.data)
        }

        if (error instanceof Error) {
            return res.status(400).json({
                status: false,
                message: error.message,
                data: []
            })
        }

        return res.status(400).json({
            status: false,
            message:appConfig.errors.back.api.errorUnknow,
            data: []
        })
    }
}

export default handler