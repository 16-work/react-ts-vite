import { motion } from 'framer-motion';

export const ReateAnimation = (props: { children: JSX.Element }) => {
    const location = useLocation();

    return (
        <motion.div
            key={location.key}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-auto"
        >
            {props.children}
        </motion.div>
    );
};
