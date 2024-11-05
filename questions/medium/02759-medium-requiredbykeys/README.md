---
title: Requiredbykeys
---

## 挑战

实现一个通用的`RequiredByKeys<T, K>`，它接收两个类型参数`T`和`K`。

`K`指定应设为必选的`T`的属性集。当没有提供`K`时，它就和普通的`Required<T>`一样使所有的属性成为必选的。

例如:

```ts
interface User {
  name?: string;
  age?: number;
  address?: string;
}

type UserRequiredName = RequiredByKeys<User, 'name'>; // { name: string; age?: number; address?: string }
```

## 解答

这道题和 `PartialByKeys` 类似，只不过是将属性设置为必选的。具体的分析可以参考 `PartialByKeys`，这里直接给出解答：

```ts
type RequiredByKeys<T, K extends keyof T = keyof T> = IntersectionToObj<
  {
    [P in keyof T as P extends K ? P : never]-?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;

type IntersectionToObj<T> = {
  [P in keyof T]: T[P];
};
```
