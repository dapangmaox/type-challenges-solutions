---
title: Anyof
---

## 挑战

在类型系统中实现类似于 Python 中 `any` 函数。类型接收一个数组，如果数组中任一个元素为真，则返回 `true`，否则返回 `false`。如果数组为空，返回 `false`。

例如：

```ts
type Sample1 = AnyOf<[1, '', false, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]>; // expected to be false.
```

## 解答

首先我们根据题目给的测试用例把所有的 `falsy` 值列出来：

```ts
type Falsy = false | 0 | '' | null | undefined | [] | { [K in any]: never };
```

要判断一个数组中是否有任意一个元素为真，我们可以逐个检查数组中的元素，判断是否存在真值。

```ts
type AnyOf<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends Falsy
    ? AnyOf<R>
    : true
  : false;
```

这里我们使用了递归的方式，首先检查数组的第一个元素，如果是 `falsy` 值，则递归检查剩余的元素，否则返回 `true`。如果数组为空，则返回 `false`。
