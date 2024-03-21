export const CheckBox = (props: { label: string; value: boolean; setValue: (bool: boolean) => void; className?: string }) => {
    return (
        <span className={`flex items-center cursor-pointer select-none ${props.className}`} onClick={() => props.setValue(!props.value)}>
            <SvgIcon name={props.value ? 'check-true' : 'check-false'} width={26} className="mr-5 text-common" />
            <span className="text-common text-20 mt-2">{props.label}</span>
        </span>
    );
};
