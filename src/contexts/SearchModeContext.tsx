import { createContext, useContext, useState } from "react";

interface SearchModeContextProps {
  isSearchMode: boolean;
  setIsSearchMode: (value: boolean) => void;
  isSearchResultSheetOpen: boolean;
  setIsSearchResultSheetOpen: (value: boolean) => void;
}

const SearchModeContext = createContext<SearchModeContextProps | undefined>(undefined);

export const SearchModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isSearchResultSheetOpen, setIsSearchResultSheetOpen] = useState(false); // ✅ 추가

  return (
    <SearchModeContext.Provider
      value={{ isSearchMode, setIsSearchMode, isSearchResultSheetOpen, setIsSearchResultSheetOpen }}
    >
      {children}
    </SearchModeContext.Provider>
  );
};

export const useSearchMode = () => {
  const context = useContext(SearchModeContext);
  if (!context) {
    throw new Error("useSearchMode must be used within a SearchModeProvider");
  }
  return context;
};
