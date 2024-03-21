import react from '@vitejs/plugin-react-swc';
import { alias } from './config/vite/alias';

export default function () {
    return {
        plugins: [react()],
        resolve: { alias },
    };
}
