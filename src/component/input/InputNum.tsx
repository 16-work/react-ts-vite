export const InputNum = (props: {
    value: number | string | undefined; // 绑定值（bigint类型传string，其默认为空值时传''）
    type?: 'number' | 'bigint';
    onChange: (newNum: any) => void; // 值正确且变化时触发
    onError?: (e: string) => void; // 错误信息（未传值时默认使用全局msg提示）

    require?: boolean; // 是否必填
    requireInt?: boolean; // 是否为整数
    format?: string; // 格式化规则

    min?: string; // 最小值
    max?: string; // 最大值

    className?: string;
    placeholder?: string;
}) => {
    /** props */
    const type = props.type ?? 'number';

    const require = props.require ?? true;
    const requireInt = props.requireInt ?? false;
    const format = props.format ?? (requireInt || type === 'bigint' ? '0,0' : '0,0.[000000000000000000]');

    const min = props.min ? (type === 'number' ? Number(props.min) : BigInt(props.min)) : undefined;
    const max = props.max ? (type === 'number' ? Number(props.max) : BigInt(props.max)) : undefined;

    /** state */
    const input = ahooks.reactive({
        num: props.value,
        text: props.value ? numeral(props.value ?? '').format(format) : '',
    });

    /** methods */
    // 校验number
    const validateNumber = () => {
        // 是否为number
        if (isNaN(Number(input.text))) {
            const error = 'Please enter a number!';
            if (props.onError) props.onError(error);
            else msg.warning(error);
            return false;
        }
        // 非整数
        else if (requireInt && Number(input.text) - parseInt(input.text) > 0) {
            const error = 'Please enter an integer!';
            if (props.onError) props.onError(error);
            else msg.warning(error);
            return false;
        }

        return true;
    };

    // 校验bigint
    const validateBigInt = () => {
        // 是否为bigint
        try {
            BigInt(input.text);
            return true;
        } catch (e) {
            const error = 'Please enter an integer!';
            if (props.onError) props.onError(error);
            else msg.warning(error);
            return false;
        }
    };

    // 校验范围
    const validateRange = () => {
        const value = type === 'number' ? Number(input.text) : BigInt(input.text);

        // 小于最小值
        if (min !== undefined && value < min) {
            const error = `The value cannot be less than ${props.min} !`;
            if (props.onError) props.onError(error);
            else msg.warning(error);
            return false;
        }
        // 大于最大值
        else if (max !== undefined && value > max) {
            const error = `The value cannot be greater than ${props.max} !`;
            if (props.onError) props.onError(error);
            else msg.warning(error);
            return false;
        }
        return true;
    };

    // 失焦时校验及格式化
    const onBlur = () => {
        // 空值校验
        input.text = input.text.trim();
        if (require && input.text === '') {
            const error = 'Please enter a number!';
            if (props.onError) props.onError(error);
            else msg.warning(error);
            return;
        }

        let flag: boolean;

        // 类型校验
        if (type === 'number') flag = validateNumber();
        else flag = validateBigInt();
        if (!flag) return;

        // 校验范围
        flag = validateRange();
        if (!flag) return;

        // 格式化值 (允许为空且输入空时不填值)
        if (props.onError) props.onError('');
        if (!require && input.text.trim() === '') {
            input.num = undefined;
            input.text = '';
        } else {
            input.num = type === 'number' ? Number(input.text) : input.text;
            input.text = numeral(input.text).format(format);
        }

        // 更新值
        props.onChange(input.num);
    };

    // 外部填入值
    ahooks.updateEffect(() => {
        if (props.value !== input.num) {
            input.num = props.value;
            input.text = numeral(props.value).format(format);
        }

        // 清空错误信息
        if (props.onError) props.onError('');
    }, [props.value]);

    /* template */
    return (
        <input
            type="text"
            value={input.text}
            className={props.className}
            placeholder={props.placeholder}
            onChange={(e) => (input.text = e.target.value)}
            onFocus={() => {
                if (input.num !== undefined) {
                    input.text = String(input.num);
                }
            }}
            onBlur={onBlur}
        />
    );
};
