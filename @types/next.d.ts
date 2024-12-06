import { NextApiRequest } from 'next';

declare module 'next' {
    export interface NextApiRequest {
        session_token?: string
        app_token?: string
    }
}