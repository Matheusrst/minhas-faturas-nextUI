import Header from "@/pages/pagamento/components/Header";
import { ReactNode } from "react";

export function LayoutPayment({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[1000rem] bg-cednetBlue">
      <Header />
      <main className="relative z-[999] flex items-start justify-center gap-8 overflow-y-auto">
        {children}
      </main>
      <div className="fixed bottom-0 left-0 z-0 h-[23.1%] w-full bg-white"></div>
    </div>
  );
}
