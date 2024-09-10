---
title: Exclude
---

## 挑战

实现内置的 `Exclude<T, U>` 类型，但不能直接使用它本身。

> 从联合类型 `T` 中排除 `U` 中的类型，来构造一个新的类型。

例如：

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
```

## 解答

这道题需要用到联合类型分布式特性，当我们 `T extends U` 且 `T` 是联合类型时，实际上发生的是 TypeScript 遍历联合类型 `T` 并将条件应用到每个元素上进行分布式计算，将结果合并成一个新的联合类型。

了解了这个特性之后，这道题就变的很简单了，我们直接检查 `T` 如果可以分配给 `U` 则返回 `never`。

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

## 参考链接

- [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
