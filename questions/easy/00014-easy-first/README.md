---
title: First
---

## 挑战

实现一个`First<T>`泛型，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // 应推导出 'a'
type head2 = First<arr2>; // 应推导出 3
```

## 解答

读取第一个元素的类型，最先想到的应该就是 `T[0]` 了。

```ts
type First<T extends any[]> = T[0];
```

但是有一个临界情况需要考虑，那就是当 `T` 为空数组时，`T[0]` 不能正常工作。因此在访问之前，我们需要检查数组是否为空数组，可以使用条件类型。所以最终实现为：

```ts
type First<T extends any[]> = T extends [] ? never : T[0];
```

## 参考链接

- [索引访问类型](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
