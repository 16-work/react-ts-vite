import * as hooks from 'ahooks';
import { Options, Service, Plugin, Result } from 'ahooks/lib/useRequest/src/types';

/* loading -> isLoading & 调整onError位置 */
export function newUseRequest<TData, TParams extends any[]>(
    service: Service<TData, TParams>,
    onErrorOrOptions?: ((e: Error, params: any) => void) | Options<TData, TParams>,
    optionsOrOnError?: Options<TData, TParams> | ((e: Error, params: any) => void),
    plugins?: Plugin<TData, TParams>[]
): Omit<Result<TData, TParams> & { isLoading: boolean }, 'loading'> {
    let options: Options<TData, TParams> | undefined;
    let onError: ((e: Error, params: any) => void) | undefined;

    if (typeof optionsOrOnError === 'function') {
        onError = optionsOrOnError;
        options = onErrorOrOptions as Options<TData, TParams>;
    } else {
        options = optionsOrOnError;
        onError = onErrorOrOptions as (e: Error, params: any) => void;
    }

    if (typeof onError === 'function') {
        options = {
            ...options,
            onError,
        };
    }

    const { loading, ...res } = hooks.useRequest(service, options, plugins);
    return { ...res, isLoading: loading };
}
