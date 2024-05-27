import { useReactive } from 'ahooks';

/* useLockFn: 新增返回isLoading */
export const newUseLockFn = <P extends any[] = any[], V = any>(fn: (...args: P) => Promise<V>) => {
    const state = useReactive({
        isLoading: false,
    });

    return {
        run: useCallback(
            async (...args: P) => {
                if (state.isLoading) return;
                state.isLoading = true;
                try {
                    const ret = await fn(...args);
                    return ret;
                } catch (e) {
                    throw e;
                } finally {
                    state.isLoading = false;
                }
            },
            [fn]
        ),
        isLoading: state.isLoading,
    };
};
