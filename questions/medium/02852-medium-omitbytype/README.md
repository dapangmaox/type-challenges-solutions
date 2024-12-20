---
title: Omitbytype
---

## 挑战

From `T`, pick a set of properties whose type are not assignable to `U`.

For Example

```typescript
type OmitBoolean = OmitByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { name: string; count: number }
```

## 解答

这道题可以使用条件类型和映射类型来从对象类型中移除所有值类型为指定类型的属性。

```typescript
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};
```

我们通过 `K in keyof T` 遍历对象类型 `T` 的所有属性，然后使用条件类型 `T[K] extends U ? never : K` 来判断属性值的类型是否为 `U`，如果是则返回 `never`，否则返回属性名 `K`。最后我们使用映射类型来生成新的对象类型。
