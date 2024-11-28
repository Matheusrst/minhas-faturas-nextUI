import { Header } from "../components/Header";
import { ReactNode } from "react";

export function LayoutDefalt({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen bg-cednetGray">
      <Header />
      <main className="flex items-start justify-center gap-4">{children}</main>
    </div>
  );
}
