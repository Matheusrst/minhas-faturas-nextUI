import { Header } from "@/pages/minhas-faturas/components/Header";
import { ReactNode } from "react";

export function LayoutDefalt({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-[100vh] bg-cednetGray">
      <Header />
      <main className="flex items-start justify-center gap-4">{children}</main>
    </div>
  );
}
