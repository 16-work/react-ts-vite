import { createBrowserRouter } from 'react-router-dom';
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
