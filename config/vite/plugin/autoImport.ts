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
                    '@/common/store': ['store'],
                    'use-immer': ['useImmer'],
                    '@/common/util/env': ['env'],
                    '@/common/util/format': ['format'],
                    'react-toastify': [['toast', 'msg']],
                    '@/common/tool/localCache': ['localCache'],
                },
            ],

            // 需要自动引入的自定义组件位置
            dirs: ['src/**/component/**/**.tsx'],

            // 声明文件位置
            dts: 'config/declare/auto-import.d.ts',
        }),
    ];
};
