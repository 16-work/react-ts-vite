import * as hooks from 'ahooks';

type Ahooks = {
    [key in keyof typeof hooks as key extends `use${infer U}` ? Uncapitalize<U> : never]: (typeof hooks)[key];
};

export const ahooks = {} as Ahooks;
for (const key in hooks) {
    // 方法名去掉 "use"，并将剩余字符串的首字母改成小写
    const methodName = key.charAt(3).toLowerCase() + key.slice(4);
    // @ts-ignore 重定义方法
    ahooks[methodName] = hooks[key as keyof typeof hooks];
}
