import { PageHome } from '@/views/home';
import { RouteObject } from 'react-router-dom';

export const baseRoutes: RouteObject[] = [
    // 首页
    {
        index: true,
        Component: PageHome,
    },
];
