import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const AnimationDrop = (props: { isFold: boolean; children: ReactNode }) => {
    return (
        <AnimatePresence>
            {props.isFold && (
                <motion.div
                    style={{ overflow: 'hidden' }}
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {props.children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
