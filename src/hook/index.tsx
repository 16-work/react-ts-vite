import wallet from './wallet';
import transaction from './transaction';

// 类型声明
export const hooks = {} as {
    wallet: ReturnType<typeof wallet>;
    transaction: ReturnType<typeof transaction>;
};

// 初始化
export const useInitHooks = () => {
    hooks.wallet = wallet();
    hooks.transaction = transaction();
};
