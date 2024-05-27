import AutoImport from 'unplugin-auto-import/vite';

export const setAutoImport = () => {
    return [
        AutoImport({
            imports: [
                // 内置api
                'react',
                'react-router-dom',

                // 自定义api
                {
                    '@/api': ['api'],
                    '@/api/axios': ['http'],
                    '@/router/path': ['path'],
                    'use-immer': ['useImmer'],
                    '@/store': ['store'],
                    '@/utils/env': ['env'],
                    '@/hooks/index.tsx': ['hooks'],
                    'react-hook-form': ['useForm'],
                    '@/utils/tools': ['tools'],
                    numeral: [['default', 'numeral']],
                    '@/utils/format': ['format'],
                    'react-toastify': [['toast', 'msg']],
                    '@/utils/localCache': ['localCache'],
                    '@/utils/ahooks/index.ts': ['ahooks'],
                    '@/layout/hooks/useInitRouterFun': ['router'],
                },
            ],

            // 需要自动引入的自定义组件位置(只自动引入公共组件)
            dirs: ['src/components/**/**.tsx'],

            // 声明文件位置
            dts: 'config/declare/auto-import.d.ts',
        }),
    ];
};
