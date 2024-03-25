import { useWatchAccount } from '@/hook/wallet/watch';
import { useSafariHacks } from './hook/useSafariHacks';

export const Layout = () => {
    useSafariHacks();
    useWatchAccount();

    router.navigate = useNavigate();

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
