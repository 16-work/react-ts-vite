import { useInitHooks } from '@/hook';
import { useInitRouterFun } from './hook/useInitRouterFun';
import { useSafariHacks } from './hook/useSafariHacks';
import { useWatchScreen } from './hook/useWatchScreen';

export const Layout = () => {
    useWatchScreen();
    useSafariHacks();
    useInitRouterFun();
    useInitHooks();

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
