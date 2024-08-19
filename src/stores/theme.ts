import { types } from 'mobx-state-tree';

const ThemeStore = types.model('ThemeStore', {
    theme: types.string,
}).actions((self) => ({
    setTheme: (theme: string) => {
        self.theme = theme;
    },
}));

export const themeStore = ThemeStore.create({
    theme: "",
});