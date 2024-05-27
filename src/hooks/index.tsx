import wallet from './wallet';

// 类型声明
export const hooks = {} as {
    wallet: ReturnType<typeof wallet>;
};

// 初始化
export const useInitHooks = () => {
    hooks.wallet = wallet();
};
