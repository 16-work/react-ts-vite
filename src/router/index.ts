import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/layout';
import { baseRoutes } from './base.routes';
import { moduleRoutes } from './module';
import { PageNotFound } from '@/views/error/NotFound';

export const browserRouter = createBrowserRouter([
    {
        path: path.home,
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
