---
title: Pickbytype
---

## 挑战

From `T`, pick a set of properties whose type are assignable to `U`.

For Example

```typescript
type OnlyBoolean = PickByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { isReadonly: boolean; isEnable: boolean; }
```

## 解答

这道题可以通过把映射类型和条件类型结合起来来解决。我们可以通过遍历 `T` 的所有属性，然后检查属性的类型是否可以赋值给 `U` 来实现。

```ts
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};
```
