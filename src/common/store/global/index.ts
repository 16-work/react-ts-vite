import { create } from 'zustand';
import { GlobalStore } from './types';
import { devtools, persist } from 'zustand/middleware';

export default create<GlobalStore>()(
    devtools(
        persist(
            (set) => ({
                theme: 'theme-dark',
                setTheme: (theme) => set(() => ({ theme })),
            }),
            { name: 'global' }
        )
    )
);
