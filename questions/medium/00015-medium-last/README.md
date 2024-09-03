---
title: Last
---

## 挑战

> 在此挑战中建议使用 TypeScript 4.0

实现一个`Last<T>`泛型，它接受一个数组`T`并返回其最后一个元素的类型。

例如

```ts
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // 应推导出 'c'
type tail2 = Last<arr2>; // 应推导出 1
```

## 解答

要得到最后一个元素的类型，我们可以使用条件类型和 infer。

```ts
type Last<T extends any[]> = T extends [...any[], infer Last] ? Last : never;
```

值得一提的是，在 TypeScript 中，可以使用类型推断从元组中提取最后一个元素。

## 参考链接

- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [infer](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
