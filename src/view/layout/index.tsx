import { useWatchAccount } from '@/hook/wallet/watch';
import { useInitRouterFun } from './hook/useInitRouterFun';
import { useSafariHacks } from './hook/useSafariHacks';
import { useInitHooks } from '@/hook';

export const Layout = () => {
    useSafariHacks();
    useInitRouterFun();

    useInitHooks();
    useWatchAccount();

    const { theme } = store.global();

    //  // 每分钟刷新USDT单价
    //  const { setUsdtUnitPrice } = store.web3();
    //  ahooks.request(
    //      async () => {
    //          const unitPrices = await api.common.getUsdtUnitPrices();
    //          setUsdtUnitPrice(unitPrices);
    //      },
    //      { pollingInterval: 1000 * 60 }
    //  );

    return (
        <div className={`${theme} h-screen flex flex-col overflow-hidden`}>
            <ReateAnimation>
                {/* main */}
                <Outlet />
            </ReateAnimation>
        </div>
    );
};
