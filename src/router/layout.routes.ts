import { PageHome } from '@/view/home';
import { RouteObject } from 'react-router-dom';

export const layoutRoutes: RouteObject[] = [
    // 首页
    {
        index: true,
        Component: PageHome,
    },
];
