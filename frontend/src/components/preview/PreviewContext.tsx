import { createContext, useContext, type ReactNode } from "react";

interface PreviewContextValue {
  isPreview: boolean;
}

const PreviewContext = createContext<PreviewContextValue>({ isPreview: false });

export function usePreview() {
  return useContext(PreviewContext);
}

export function PreviewProvider({
  children,
  isPreview = false,
}: {
  children: ReactNode;
  isPreview?: boolean;
}) {
  return (
    <PreviewContext.Provider value={{ isPreview }}>
      {children}
    </PreviewContext.Provider>
  );
}