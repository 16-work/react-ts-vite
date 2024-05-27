export const InputNum = (props: {
    value?: number | string | undefined; // 绑定值（bigint类型传string，其默认为空值时传''）
    type?: 'number' | 'bigint'; // (默认number)
    onChange?: (newNum: any) => void; // 值正确且变化时触发
    onBlur?: (val: any) => void; // 值正确且变化时触发
    onError?: (e: string) => void; // 错误信息（未传值时默认使用全局msg提示）

    require?: boolean; // 是否必填 (默认: true)
    requireInt?: boolean; // 是否为整数 (默认: false)
    requireNonZero?: boolean; // 是否为非0值 (默认: false)
    format?: string; // 格式化规则 (默认: int ? 0,0 : 0,0.[000000000000000000] )

    min?: string; // 最小值
    max?: string; // 最大值
    className?: string;
    placeholder?: string;
    disabled?: boolean;
}) => {
    /** props */
    const type = props.type ?? 'number';

    const require = props.require ?? true;
    const format = props.format ?? (props.requireInt || type === 'bigint' ? '0,0' : '0,0.[000000000000000000]');

    /** params */
    const input = ahooks.reactive({
        text: props.value ? numeral(props.value ?? '').format(format) : '',
    });
    // 失焦时校验及格式化
    const onBlur = () => {
        // 空值校验
        input.text = input.text.trim();
        if (require && input.text === '') {
            const error = 'Please enter a number.';
            if (props.onError) props.onError(error);
            return;
        }
        // 更新值
        props.onChange && props.onChange(input.text);
        props.onBlur && props.onBlur(input.text);
    };

    useEffect(() => {
        input.text = (props.value ?? '') as string;
    }, [props.value]);

    /* template */
    return (
        <input
            type="text"
            value={input.text}
            className={props.className}
            placeholder={props.placeholder}
            onChange={(e) => {
                input.text = onlyInputPositiveNumber(e.target.value);
                props.onChange && props.onChange(input.text);
            }}
            disabled={props.disabled}
            onBlur={onBlur}
        />
    );
};

const onlyInputPositiveNumber = (str: string) => {
    if (!str) return str;
    // 去除非数字和小数点字符
    const onlyNumbers = str.replace(/[^\d.]/g, '');
    // 移除开头的多余的小数点
    const noLeadingDot = onlyNumbers.replace(/^\./, '');
    // 移除多余的小数点
    const noExtraDots = noLeadingDot.replace(/\.+/g, '.');
    // 移除多余的小数部分
    const parts = noExtraDots.split('.');
    if (parts.length > 1) {
        const integerPart = parts[0];
        const decimalPart = parts[1];
        return `${integerPart}.${decimalPart}`;
    }
    return noExtraDots;
};
