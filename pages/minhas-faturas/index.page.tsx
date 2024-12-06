import { SelectedItemsProvider } from "@/contexts/SelectedItemsContext";
import { LayoutDefalt } from "@/layout/default";
import { Page } from "../invoices/page";

export default function Home() {
  return (
    <SelectedItemsProvider>
      <LayoutDefalt>
        <Page />
      </LayoutDefalt>
    </SelectedItemsProvider>
  );
}
