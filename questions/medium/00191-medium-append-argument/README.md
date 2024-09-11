---
title: Append Argument
---

## 挑战

> 由 @antfu 翻译

实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

```typescript
type Fn = (a: number, b: string) => number;

type Result = AppendArgument<Fn, boolean>;
// 期望是 (a: number, b: string, x: boolean) => number
```

> 本挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 在 Dev.io 上的[文章](https://dev.to/macsikora/advanced-typescript-exercises-question-4-495c)

## 解答

这个挑战要求我们返回一个新的函数类型。我们知道函数类型由两部分组成：参数类型和返回类型。所以我们可以想办法推断出原有函数的参数类型和返回类型，推断出来这些类型之后，和新的参数一起组合成新的函数类型。

首先我们可以借助条件类型和 infer 推断出原函数的参数类型和返回类型。

```ts
type AppendArgument<Fn, A> = Fn extends (...args: infer Args) => infer R
  ? (...args: [...Args]) => R
  : Fn;
```

在参数的位置，我们可以使用 `...` 来将参数整体推断成一个元组。

接下来我们返回一个新的函数，按照题目描述，我们只需要把新加的 `A` 加到 `Args` 的后面即可。

```ts
type AppendArgument<Fn, A> = Fn extends (...args: infer Args) => infer R
  ? (...args: [...Args, A]) => R
  : Fn;
```

最后我们对 `Fn` 进行一下约束，只接受函数类型。

最终实现为：

```ts
type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (
  ...args: infer Args
) => infer R
  ? (...args: [...Args, A]) => R
  : Fn;
```

## 参考链接

- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [infer](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
- [Rest Parameters and Arguments](https://www.typescriptlang.org/docs/handbook/2/functions.html#rest-parameters-and-arguments)
