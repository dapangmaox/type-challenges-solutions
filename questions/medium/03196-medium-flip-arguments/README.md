---
title: Flip Arguments
---

## 挑战

Implement the type version of lodash's `_.flip`.

Type `FlipArguments<T>` requires function type `T` and returns a new function type which has the same return type of T but reversed parameters.

需要实现一个 TypeScript 类型工具 FlipArguments<T>，其功能是将函数类型 T 的参数顺序完全反转，同时保持函数返回类型不变。

For example:

```typescript
type Flipped = FlipArguments<
  (arg0: string, arg1: number, arg2: boolean) => void
>;
// (arg0: boolean, arg1: number, arg2: string) => void
```

## 解答

这道题只是在 03192 题目中多了一步提取参数类型和返回类型，之后使用 Reverse 反转参数类型，最后将反转后的参数类型与原始返回类型组合成新函数类型。

```typescript
type FlipArguments<T extends (...args: any) => any> = T extends (
  ...args: infer Params
) => infer R
  ? (...args: Reverse<Params>) => R
  : T;

type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : [];
```
