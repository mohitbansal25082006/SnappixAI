"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemesProviderProps } from "next-themes";
import type { ReactNode } from "react";

type Attribute = "class" | "data-theme" | Array<"class" | "data-theme">;

interface ThemeProviderProps extends Omit<NextThemesProviderProps, "attribute"> {
  children: ReactNode;
  attribute?: Attribute;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
