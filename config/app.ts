export const appConfig = {
    title: 'Minhas Faturas',
    errors: {
        custom: {
            envIsUndefined: (key: string) => `Variável de ambiente ${key} não carregada corretamente.`,
        },
        front: {
            requests: {
                errorUnknow: "Houve um erro desconhecido ao tentar requisitar o serviço de api."
            }
        },
        back: {
            api: {
                errorUnknow: "Houve um desconhecido ao processar a rota solicitada.",
                incorrectMethod: "Method is not allowed!"
            },
            server: {}
        }
    }
}