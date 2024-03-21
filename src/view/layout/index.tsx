import { useSafariHacks } from './hook/useSafariHacks';

export const Layout = () => {
    useSafariHacks();

    router.navigate = useNavigate();

    const { theme } = store.global();

    return (
        <div className={`${theme} h-screen flex flex-col overflow-hidden`}>
            {/* main */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};
