export const InputNum = (props: {
    value: number | string | undefined; // 绑定值（bigint类型传string，其默认为空值时传''）
    type?: 'number' | 'bigint'; // (默认number)
    onChange: (newNum: any) => void; // 值正确且变化时触发
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

    const min = props.min ? (type === 'number' ? Number(props.min) : BigInt(props.min)) : undefined;
    const max = props.max ? (type === 'number' ? Number(props.max) : BigInt(props.max)) : undefined;

    /** params */
    const input = ahooks.reactive({
        num: props.value,
        text: props.value ? numeral(props.value ?? '').format(format) : '',
    });

    /** actions */
    // 校验number
    const validateNumber = () => {
        // 是否为number
        if (isNaN(Number(input.text))) {
            const error = 'Please enter a number.';
            if (props.onError) props.onError(error);
            else msg.warning(error);
            return false;
        }
        // 非整数
        else if (props.requireInt && Number(input.text) - parseInt(input.text) > 0) {
            const error = 'Please enter an integer.';
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
            const error = 'Please enter an integer.';
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
            const error = `The value cannot be less than ${props.min}.`;
            if (props.onError) props.onError(error);
            else msg.warning(error);
            return false;
        }
        // 大于最大值
        else if (max !== undefined && value > max) {
            const error = `The value cannot be greater than ${props.max}.`;
            if (props.onError) props.onError(error);
            else msg.warning(error);
            return false;
        }
        // 为非0值
        else if (props.requireNonZero && input.text === '0') {
            const error = `The value cannot be 0.`;
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
            const error = 'Please enter a number.';
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

            // 数字超过9,999,999,999,999,99后，请采用大数记法格式化，或使用原值
            if (type === 'bigint' && BigInt(input.num) > BigInt('999999999999999')) {
                input.text = numeral(input.text).format('0.000e+0', Math.floor);
            } else {
                // 获取整数部分
                const indexOfDot = input.text.indexOf('.');
                const intPart = indexOfDot !== -1 ? input.text.substring(0, indexOfDot) : input.text;
                // 数值超大采用大数记法格式化
                if (BigInt(intPart) >= BigInt('999999999999999')) {
                    input.text = numeral(input.text).format('0.000e+0', Math.floor);
                }
                // 数值正常采用设置值格式化
                else input.text = numeral(input.text).format(format);
            }
        }

        // 更新值
        props.onChange(input.num);
    };

    // 外部填入值
    ahooks.updateEffect(() => {
        if (props.value !== input.num) {
            input.num = props.value;
            input.text = props.value === '' ? '' : numeral(props.value).format(format);
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
            disabled={props.disabled}
            onFocus={() => {
                if (input.num !== undefined) {
                    input.text = String(input.num);
                }
            }}
            onBlur={onBlur}
        />
    );
};
