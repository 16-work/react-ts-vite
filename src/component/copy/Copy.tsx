import { CopyToClipboard } from 'react-copy-to-clipboard';

export const Copy = (props: { children: JSX.Element; text: string }) => {
    return (
        <CopyToClipboard
            text={props.text}
            onCopy={() => {
                msg.success('Copy successful!', { autoClose: 1000 });
            }}
        >
            <span>{props.children}</span>
        </CopyToClipboard>
    );
};
