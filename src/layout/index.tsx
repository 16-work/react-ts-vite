import { useInitHooks } from '@/hooks';
import { useInitRouterFun } from './hooks/useInitRouterFun';
import { useSafariHacks } from './hooks/useSafariHacks';
import { useWatchScreen } from './hooks/useWatchScreen';
import { ReateAnimation } from './component/RouteAnimation';

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
