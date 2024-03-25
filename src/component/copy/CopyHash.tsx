export const CopyHash = (props: { hash: string; type: 'address' | 'trx'; format?: number[]; className?: string }) => {
    const { explorerURL } = store.wallet();

    // 格式化hash值
    const formatHash = props.format?.length === 2 ? format.address(props.hash, props.format[0], props.format[1]) : props.hash;

    return (
        <div className={`w-fit flex justify-center items-center ${props.className}`}>
            {
                // address
                props.type === 'address' ? (
                    <Link to={{ pathname: `/user`, search: `?address=${props.hash}` }} target="_blank" className="underline">
                        {formatHash}
                    </Link>
                ) : (
                    // trx
                    <a href={explorerURL + '/tx/' + props.hash} target="_blank" className="underline">
                        {formatHash}
                    </a>
                )
            }

            {/* icon: copy */}
            <Copy text={props.hash}>
                <SvgIcon name="copy" width={18} className="cursor-pointer ml-5" />
            </Copy>
        </div>
    );
};
