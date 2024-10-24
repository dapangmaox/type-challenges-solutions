---
title: Minusone
---

## 挑战

给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。

例如:

```ts
type Zero = MinusOne<1>; // 0
type FiftyFour = MinusOne<55>; // 54
```

## 解答

这道题我使用的递归，只实现了前面的几个测试用例。原理是借助于一个辅助数组，初始为空数组，然后递归地往数组中添加元素，直到长度等于输入的数字，之后我们只需要返回数组的长度减 1 即可。

```ts
type Pop<T extends any[]> = T extends [...infer head, any] ? head : never;

type MinusOne<T extends number, A extends any[] = []> = A['length'] extends T
  ? Pop<A>['length']
  : MinusOne<T, [...A, 0]>;
```
