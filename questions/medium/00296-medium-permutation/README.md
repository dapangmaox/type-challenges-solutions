---
title: Permutation
---

## 挑战

实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

```typescript
type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

## 解答

这道题在 [Issue](https://github.com/type-challenges/type-challenges/issues/614#issue-779242337) 区有一个很好的推导过程，[掘金](https://juejin.cn/post/7165170011282079751) 也有小伙伴翻译了中文版。

这里直接给出答案。

```ts
type Permutation<All, Item = All> = [All] extends [never]
  ? []
  : Item extends All
  ? [Item, ...Permutation<Exclude<All, Item>>]
  : never;
```

## 参考链接
