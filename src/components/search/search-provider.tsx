"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ToolSearchDialog } from "@/components/search/tool-search-dialog";

type SearchContextValue = { open: () => void };

const SearchContext = createContext<SearchContextValue>({ open: () => {} });

export const useToolSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <SearchContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <ToolSearchDialog open={isOpen} onOpenChange={setIsOpen} />
    </SearchContext.Provider>
  );
};
