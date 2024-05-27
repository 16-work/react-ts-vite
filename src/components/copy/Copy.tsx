import { ReactNode } from 'react';

export const Copy = (props: { children: ReactNode; text: string }) => {
    return (
        <span
            onClick={(e) => {
                e.stopPropagation();
                tools.copy(props.text);
                msg.success('Copy successful!', { autoClose: 1000 });
            }}
        >
            {props.children}
        </span>
    );
};
