import ReactDOM from 'react-dom/client';
import '@/asset/theme/index.css';
import '@/asset/css/base.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './router/index.ts';
import 'virtual:svg-icons-register';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <WalletProvider>
        <div className="h-full">
            <RouterProvider router={browserRouter} />
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    </WalletProvider>
);
