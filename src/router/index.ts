import { NavigateFunction, createBrowserRouter } from 'react-router-dom';
import { baseRoutes } from './base.routes';
import { moduleRoutes } from './module';
import { layoutRoutes } from './layout.routes';
import { Layout } from '@/view/layout';

export const browserRouter = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [...layoutRoutes, ...moduleRoutes],
    },
    ...baseRoutes,
]);

export const router = {
    // 可供layout内的所有路由使用
    navigate: {} as NavigateFunction,
};
