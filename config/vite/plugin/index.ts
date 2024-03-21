import { PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';

export const setPlugins = (env: MetaEnv) => {
    let plugins: PluginOption[] = [react()];

    return plugins;
};
