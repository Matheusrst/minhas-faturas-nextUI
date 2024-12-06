import { appConfig } from '@/config/app'
import { integration } from '@/services/integration';
import { AxiosError } from 'axios'
import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next'

export function apiAuth(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const baseAppToken = process.env.INTEGRATIONS_BASE_SECRET as string;
            const sessionTag = process.env.SESSION_TAG as string;

            // Validando se existe o token. 
            if (!baseAppToken) {
                throw new Error(appConfig.errors.custom.envIsUndefined('INTEGRATIONS_BASE_SECRET'))
            }

            // Validando se existe o token. 
            if (!sessionTag) {
                throw new Error(appConfig.errors.custom.envIsUndefined('SESSION_TAG'))
            }

            const token = req.cookies[sessionTag]

            if (!token) {
                return res.status(403).json({
                    status: false,
                    message: "Acesso não autorizado. Faça login.",
                    data: []
                })
            }

            // Carregando token de aplicativo na request.
            req.app_token = baseAppToken
            req.session_token = token     
            
            return handler(req, res)
        } catch (error) {
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
}