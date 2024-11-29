import { createContext, useContext, useState, ReactNode } from "react";

// Definir o contexto e o tipo do estado
interface SelectedItemsContextType {
  selectedItems: number[];
  toggleItem: (index: number) => void;
  selectAllItems: () => void;
  clearAllItems: () => void;
}

const SelectedItemsContext = createContext<
  SelectedItemsContextType | undefined
>(undefined);

export const useSelectedItems = () => {
  const context = useContext(SelectedItemsContext);
  if (!context) {
    throw new Error(
      "useSelectedItems must be used within a SelectedItemsProvider",
    );
  }
  return context;
};

export const SelectedItemsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const selectAllItems = () => {
    setSelectedItems(Array.from({ length: 7 }, (_, i) => i)); // Ou o número de itens que você tem
  };

  const clearAllItems = () => {
    setSelectedItems([]);
  };

  return (
    <SelectedItemsContext.Provider
      value={{ selectedItems, toggleItem, selectAllItems, clearAllItems }}
    >
      {children}
    </SelectedItemsContext.Provider>
  );
};
