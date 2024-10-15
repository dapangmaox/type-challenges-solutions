---
title: Replacekeys
---

## 挑战

实现一个类型 ReplaceKeys，用于替换联合类型中的键。如果某些类型没有这个键，则跳过替换。该类型接受三个参数。

例如：

```ts
type NodeA = {
  type: 'A';
  name: string;
  flag: number;
};

type NodeB = {
  type: 'B';
  id: number;
  flag: number;
};

type NodeC = {
  type: 'C';
  name: string;
  flag: number;
};

type Nodes = NodeA | NodeB | NodeC;

type ReplacedNodes = ReplaceKeys<
  Nodes,
  'name' | 'flag',
  { name: number; flag: string }
>; // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', { aa: number }>; // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
```

## 解答

这道题，首先我们肯定要把对象 `U` 映射成新的对象，然后根据 `K` 中的键来替换原有的键。

```ts
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: U[K];
};
```

对于每一个 `K`，我们需要判断是否在 `T` 中，如果在，则替换为 `Y` 中的键，否则保持原样。

```ts
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: K extends T ? Y[K] : U[K];
};
```

但这样会报错，我们不能直接写 `Y[K]`，因为 `K` 可能不在 `Y` 中。我们可以使用条件类型来解决这个问题。

所以最终实现为：

```ts
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
};
```
