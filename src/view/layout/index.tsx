import { useWatchAccount } from '@/hook/wallet/watch';
import { useInitRouterFun } from './hook/useInitRouterFun';
import { useSafariHacks } from './hook/useSafariHacks';

export const Layout = () => {
    useSafariHacks();
    useWatchAccount();

    router.navigate = useNavigate();
    useInitRouterFun();

    const { theme } = store.global();

    return (
        <div className={`${theme} h-screen flex flex-col overflow-hidden`}>
            <ReateAnimation>
                {/* main */}
                <Outlet />
            </ReateAnimation>
        </div>
    );
};
