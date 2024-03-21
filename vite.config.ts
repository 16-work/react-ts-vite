import react from '@vitejs/plugin-react-swc';
import { alias } from './config/vite/alias';
import { ConfigEnv, loadEnv } from 'vite';
import path from 'path';
import { parseEnv } from './config/vite/utils';
import { setServer } from './config/vite/server';

export default ({ mode }: ConfigEnv) => {
    const root = path.resolve(__dirname, './config/env');
    const env = parseEnv(loadEnv(mode, root));

    return {
        plugins: [react()],
        resolve: { alias },
        envDir: './config/env', // 读取环境变量目录
        server: setServer(env),
    };
};
