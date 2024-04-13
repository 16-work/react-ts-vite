import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/view/layout';
import { baseRoutes } from './base.routes';
import { moduleRoutes } from './module';
import { PageNotFound } from '@/view/error/NotFound';

export const browserRouter = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            ...baseRoutes,
            ...moduleRoutes,
            // 404
            {
                path: '*',
                Component: PageNotFound,
            },
        ],
    },
]);
