---
title: Tuple To Union
---

## 挑战

实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

例如

```ts
type Arr = ['1', '2', '3'];

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

## 解答

在 TypeScript 中，要从 tuple 生成一个 union 很简单，只需要使用 `T[number]`。

## 参考链接

- [索引访问类型](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
