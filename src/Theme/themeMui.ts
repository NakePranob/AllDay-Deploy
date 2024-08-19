import { createTheme } from '@mui/material/styles';
import { Noto_Sans_Thai } from "next/font/google";

const notoThai = Noto_Sans_Thai({ subsets: ["latin"] });

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#60A5FA',
    },
  },
  typography: {
    fontFamily: notoThai.style.fontFamily,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60A5FA',
    },
  },
  typography: {
    fontFamily: notoThai.style.fontFamily,
  },
});
