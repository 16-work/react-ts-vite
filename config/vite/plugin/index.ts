import { PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { setMock } from './mock';
import { setAutoImport } from './autoImport';
import { setSvg } from './svg';

export const setPlugins = (env: MetaEnv) => {
    let plugins: PluginOption[] = [react()];

    if (env.VITE_ENV === 'mock') plugins.push(setMock());
    plugins.push(...setAutoImport());
    plugins.push(setSvg());

    return plugins;
};
