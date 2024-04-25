import demo from './demo';

// 类型声明
export const hooks = {} as {
    demo: ReturnType<typeof demo>;
};

// 初始化
export const useInitHooks = () => {
    hooks.demo = demo();
};
