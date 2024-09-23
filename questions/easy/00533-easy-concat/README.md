---
title: Concat
---

## 挑战

在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

例如：

```ts
type Result = Concat<[1], [2]>; // expected to be [1, 2]
```

## 解答

我们可以使用展开操作符讲两个数组中的所有元素放到一个新的数组中。

```ts
type Concat<T, U> = [...T, ...U];
```

但是这样会报错 `A rest element type must be an array type.`，我们需要添加类型约束。

```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U];
```

但是有一个 test case 是 readonly 元组，不能满足 `any[]` 的约束。为了处理这个问题，我们还需要加上 `readonly`。

所以最终实现为：

```ts
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];
```

## 参考链接
