import AutoImport from 'unplugin-auto-import/vite';

export const setAutoImport = () => {
    return [
        AutoImport({
            imports: [
                // 内置api
                'react',

                // 自定义api
                {
                    'use-immer': ['useImmer'],
                },
            ],

            // 需要自动引入的自定义组件位置
            dirs: ['src/**/component/**/**.tsx'],

            // 声明文件位置
            dts: 'config/declare/auto-import.d.ts',
        }),
    ];
};
