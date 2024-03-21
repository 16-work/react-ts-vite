export const Layout = () => {
    router.navigate = useNavigate();

    return (
        <div className={`h-screen flex flex-col overflow-hidden`}>
            {/* main */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};
