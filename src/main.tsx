import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/asset/theme/index.css';
import '@/asset/css/base.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div className="h-full">
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    </React.StrictMode>
);
