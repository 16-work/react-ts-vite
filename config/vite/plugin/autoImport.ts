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
                    '@/hook': ['hook'],
                    '@/router': ['router'],
                    '@/api/axios': ['http'],
                    'use-immer': ['useImmer'],
                    '@/common/store': ['store'],
                    '@/common/util/env': ['env'],
                    'react-hook-form': ['useForm'],
                    '@/common/util/debug': ['debug'],
                    numeral: [['default', 'numeral']],
                    '@/common/util/format': ['format'],
                    'react-toastify': [['toast', 'msg']],
                    '@/common/util/localCache': ['localCache'],
                    '@/common/util/ahooks/index.ts': ['ahooks'],
                    '@/view/layout/hook/useInitRouterFun': ['router'],
                },
            ],

            // 需要自动引入的自定义组件位置
            dirs: ['src/**/component/**/**.tsx'],

            // 声明文件位置
            dts: 'config/declare/auto-import.d.ts',
        }),
    ];
};
