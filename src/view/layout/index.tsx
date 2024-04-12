import { useInitRouterFun } from './hook/useInitRouterFun';
import { useSafariHacks } from './hook/useSafariHacks';

export const Layout = () => {
    useSafariHacks();
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
