import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import nookies from "nookies";
import { appConfig } from "@/config/app";
import { AxiosError } from "axios";
import { nextApi } from "@/services/next-api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const signInSchema = z.object({
  document: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "Formato de documento inválido",
    })
    .min(11, "Documento é obrigatório."),
});

type SignInType = z.infer<typeof signInSchema>;

export function SignIn() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { handleSubmit, register } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async function name({ document }: SignInType) {
      try {
        setErrorMessage(null);
        const session_tag = process.env.NEXT_PUBLIC_SESSION_TAG as string;

        if (!session_tag) {
          throw new Error(
            appConfig.errors.custom.envIsUndefined("NEXT_PUBLIC_SESSION_TAG"),
          );
        }

        const response = await nextApi.post<ActionsResponse<{ token: string }>>(
          "/sign-in",
          { document },
        );

        if (response.status === 200) {
          if (response.data.status) {
            const data = response.data.data;

            nookies.destroy(null, session_tag);
            nookies.set(null, session_tag, data.token);

            return router.push("/minhas-faturas");
          }

          throw new Error(response.data.message);
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const data = error.response.data as ActionsResponse<[]>;
          return setErrorMessage(data.message);
        }

        if (error instanceof Error) {
          return setErrorMessage(error.message);
        }

        return setErrorMessage(appConfig.errors.front.requests.errorUnknow);
      }
    },
  });

  async function handleSignIn({ document }: SignInType) {
    signIn({ document });
  }

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `url(/images/BG-Faturas.png)`,
      }}
    >
      <div className="flex w-11/12 max-w-full flex-col overflow-hidden rounded-md border-2 border-blue-500 border-opacity-50 shadow-md lg:flex-row">
        {/* Form Section */}
        <div className="flex flex-1 flex-col items-center justify-center p-8">
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex w-full max-w-md flex-col gap-6"
          >
            <div className="text-center">
              <img
                src={`images/logo.png`}
                alt="Logo"
                className="mx-auto mb-4 w-56"
              />
              <h1 className="text-3xl font-bold uppercase text-white">
                Minhas Faturas
              </h1>
            </div>
            {errorMessage && (
              <p className="text-center font-medium text-red-500">
                {errorMessage}
              </p>
            )}
            <input
              type="text"
              {...register("document")}
              placeholder="Seu CPF ou CNPJ"
              className="w-full rounded-md border-2 border-cednetWhite bg-blue-700 bg-opacity-[40%] px-4 py-3 text-center text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="w-full rounded-md border-2 border-cednetWhite bg-blue-600 bg-opacity-[10%] py-3 text-xl font-semibold text-white hover:bg-blue-700"
            >
              Carregar faturas
            </button>
            {/* <div className="mt-4 text-center">
              <a
                href="/minhas-faturas"
                className="text-sm text-gray-400 hover:underline"
              >
                Termos de uso
              </a>
            </div> */}
          </form>
        </div>

        {/* Banner Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={`images/Minhas-Faturas-Grupo-CEDNET.png`}
            alt="Banner"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
