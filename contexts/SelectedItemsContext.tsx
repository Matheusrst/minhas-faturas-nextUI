import { createContext, useContext, useState, ReactNode } from "react";

// Tipo para os dados do contexto
interface SelectedItemsContextType {
  selectedItems: number[];
  toggleItem: (id: number) => void;
  isItemSelected: (id: number) => boolean;
  selectAllItems: (ids: number[]) => void;
  clearAllItems: () => void;
}

// Criar o contexto
const SelectedItemsContext = createContext<
  SelectedItemsContextType | undefined
>(undefined);

// Hook para usar o contexto
export const useSelectedItems = () => {
  const context = useContext(SelectedItemsContext);
  if (!context) {
    throw new Error(
      "useSelectedItems must be used within a SelectedItemsProvider",
    );
  }
  return context;
};

// Provedor do contexto
export const SelectedItemsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Alternar seleção de um item
  const toggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Verificar se um item está selecionado
  const isItemSelected = (id: number) => {
    return selectedItems.includes(id);
  };

  // Selecionar todos os itens
  const selectAllItems = (ids: number[]) => {
    setSelectedItems(ids);
  };

  // Limpar todas as seleções
  const clearAllItems = () => {
    setSelectedItems([]);
  };

  return (
    <SelectedItemsContext.Provider
      value={{
        selectedItems,
        toggleItem,
        isItemSelected,
        selectAllItems,
        clearAllItems,
      }}
    >
      {children}
    </SelectedItemsContext.Provider>
  );
};
