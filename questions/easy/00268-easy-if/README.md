---
title: If
---

## 挑战

实现一个 `IF` 类型，它接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 `true` 或者 `false`， `T` 和 `F` 可以是任意类型。

例如：

```ts
type A = If<true, 'a', 'b'>; // expected to be 'a'
type B = If<false, 'a', 'b'>; // expected to be 'b'
```

## 解答

这道题很简单，只需要用到条件类型。但我们需要对 `C` 做一些限制，只接受 `boolean` 类型。

```ts
type If<C extends boolean, T, F> = C extends true ? T : F;
```

## 参考链接

- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
