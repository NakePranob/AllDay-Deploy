'use client'
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { observer } from "mobx-react"
import { useStore } from './Theme';
import { lightTheme, darkTheme } from '@/Theme/themeMui'

export const MuiThemeProvider = observer(({ children }: {children: React.ReactNode}) => {

    const themeStore = useStore();
    const [theme, setTheme] = useState(lightTheme);

    useEffect(() => {
        if (themeStore.theme === 'light') {
            setTheme(lightTheme)
        } else if (themeStore.theme === 'dark') {
            setTheme(darkTheme)
        } else if (themeStore.theme === '') {
            const localTheme = localStorage.getItem('theme');
            if (localTheme === 'light') {
                setTheme(lightTheme)
            } else if (localTheme === 'dark') {
                setTheme(darkTheme)
            } else {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setTheme(darkTheme)
                } else {
                    setTheme(lightTheme)
                }
            }
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme(darkTheme)
            } else {
                setTheme(lightTheme)
            }
        }
    }, [themeStore.theme])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (event: MediaQueryListEvent) => {
            const localTheme = localStorage.getItem('theme');
            if (localTheme === 'system' || localTheme === null) {
                if (event.matches) {
                    setTheme(darkTheme)
                } else {
                    setTheme(lightTheme)
                }
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
});