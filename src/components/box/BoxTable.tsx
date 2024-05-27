export const BoxTable = (props: {
    fields: string[];
    gridCols: string;
    list: any[];
    total: number;
    isLoading: boolean;
    children: (item: any, index: number) => React.ReactNode;
}) => {
    return (
        <div className="h-full flex flex-col">
            {/* thead */}
            <div
                className={`
                grid ${props.gridCols} pb-10
                border-b border-hr-1
                text-tip text-16 text-center
            `}
            >
                {props.fields.map((field) => (
                    // field
                    <span key={field}>{field}</span>
                ))}
            </div>

            {/* tbody */}
            <BoxFill className="relative pt-10">
                {/* rows */}
                {props.list.map((item, index) => (
                    // row
                    <div
                        key={index}
                        className={`
                            row-active grid ${props.gridCols} justify-items-center place-items-center py-8 
                            text-16 text-common text-center 
                        `}
                    >
                        {props.children(item, index)}
                    </div>
                ))}

                {/* load */}
                {props.isLoading && <Load />}

                {/* no data */}
                {props.total === 0 && !props.isLoading && <NoData />}
            </BoxFill>
        </div>
    );
};
