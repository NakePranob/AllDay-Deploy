'use client'
import { ThemeProvider as NextTheme } from 'next-themes';
import { createContext, useContext } from 'react';
import { themeStore } from '@/stores/theme';

const themeContext = createContext(themeStore);

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
  return (
    <themeContext.Provider value={themeStore}>
      <NextTheme attribute='class' defaultTheme="system" enableSystem>
        {children}
      </NextTheme>
    </themeContext.Provider>
  );
};

export const useStore = () => useContext(themeContext);
