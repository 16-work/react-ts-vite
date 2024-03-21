import { create } from 'zustand';
import { GlobalStore } from './types';

export default create<GlobalStore>((set) => ({
    theme: localCache.get('theme', 'theme-dark'),
    setTheme: (theme: string) => {
        localCache.set('theme', theme);
        set({ theme });
    },
}));
