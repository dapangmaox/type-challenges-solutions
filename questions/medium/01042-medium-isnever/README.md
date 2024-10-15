---
title: Isnever
---

## 挑战

Implement a type IsNever, which takes input type `T`.
If the type of resolves to `never`, return `true`, otherwise `false`.

For example:

```ts
type A = IsNever<never>; // expected to be true
type B = IsNever<undefined>; // expected to be false
type C = IsNever<null>; // expected to be false
type D = IsNever<[]>; // expected to be false
type E = IsNever<number>; // expected to be false
```

## 解答

这道题目的解法非常简单，只需要使用条件类型即可。

```ts
type IsNever<T> = [T] extends [never] ? true : false;
```

我们之所以用 `[T] extends [never]` 而不是 `T extends never` 是因为 `extends` 的分布式特性，而我们希望 `T` 保持原样。
