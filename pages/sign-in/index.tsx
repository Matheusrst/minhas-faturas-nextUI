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
    <div className="border border-red-500">
      <form onSubmit={handleSubmit(handleSignIn)}>
        <input {...register("document")} />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">logar</button>
      </form>
    </div>
  );
}
