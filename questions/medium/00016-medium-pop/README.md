---
title: Pop
---

## 挑战

> 在此挑战中建议使用 TypeScript 4.0

实现一个泛型`Pop<T>`，它接受一个数组`T`，并返回一个由数组`T`的前 N-1 项（N 为数组`T`的长度）以相同的顺序组成的数组。

例如

```ts
type arr1 = ['a', 'b', 'c', 'd'];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]
```

**额外**：同样，您也可以实现`Shift`，`Push`和`Unshift`吗？

## 解答

我们需要将数组分成两部份：从头部到最后一个元素之前的所有内容和最后一个元素本身。 之后，我们就可以去掉最后一个元素并返回头部部分了。

```ts
type Pop<T extends any[]> = T extends [...infer R, any] ? R : T;
```

另外三个：

```ts
type Shift<T extends any[]> = T extends [any, ...infer R] ? R : T;
type Push<T extends any[], V> = [...T, V];
type Unshift<T extends any[], V> = [V, ...T];
```

## 参考链接

- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [infer](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
