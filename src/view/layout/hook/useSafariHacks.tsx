// 兼容safari 100vh
export const useSafariHacks = () => {
    const safariHacks = () => {
        let windowsVH = window.innerHeight / 100;
        const container = document.querySelector('#root') as HTMLElement;
        container.style.setProperty('--vh', windowsVH + 'px');

        window.addEventListener('resize', function () {
            container.style.setProperty('--vh', windowsVH + 'px');
        });
    };

    useEffect(() => {
        let isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
        if (isSafari) safariHacks();
    }, []);
};
