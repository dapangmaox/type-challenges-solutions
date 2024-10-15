---
title: Isunion
---

## 挑战

Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

For example:

```ts
type case1 = IsUnion<string>; // false
type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false
```

## 解答

```ts
type IsUnion<T, K = T> = [T] extends [never]
  ? false
  : K extends T // 肯定成立
  ? [T] extends [K] // 说明只有一个元素
    ? false
    : true
  : false;
```

我们首先判断 `T` 是否是 `never` 类型，如果是，则返回 `false`。

然后我们定义一个辅助类型 `K`，默认为 `T`。接着我们判断 `K` 是否是 `T` 的子类型，如果是，则说明 `T` 是联合类型。最后我们判断 `T` 是否只有一个元素，如果是，则返回 `false`，否则返回 `true`。
