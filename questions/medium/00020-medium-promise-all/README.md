---
title: Promise All
---

## 挑战

给函数 `PromiseAll` 指定类型，它接受元素为 Promise 或者类似 Promise 的对象的数组，返回值应为`Promise<T>`，其中`T`是这些 Promise 的结果组成的数组。

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// 应推导出 `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);
```

## 解答

这道题要实现一个类似 `Promise.all()` 的类型。

通过题目描述，我们知道这道题要通过 `PromiseAll` 的参数得到返回的类型，所以我们需要通过泛型将两个类型关联起来。

```ts
declare function PromiseAll<T extends any[]>(values: T): any;
```

并且返回值为一个 `Promise` 数组，我们先返回一个 `Promise<R>`。

```ts
declare function PromiseAll<T extends any[]>(values: T): Promise<R>;
```

`R` 需要我们操作 `T` 来生成一个新的数组，要得到 Promise 或者类似 Promise 的对象，可以使用 TypeScript 内置的 `Awaited` 获取。

```ts
declare function PromiseAll<T extends any[]>(
  values: T
): Promise<{
  [key in keyof T]: Awaited<T[key]>;
}>;
```

这段代码看起来可能有些奇怪，因为返回的 Promise 看起来像是包裹了一个对象，不是我们期待的数组。但其实，这里的 `T` 我们知道是一个数组类型，所以 `keyof T` 实际上是数组的索引类型，也就是数字类型。

因此，这个映射类型实际上是一个元组类型，每个元素对应输入数组中的一个元素的解析值。

例如，如果 `T` 是 `[Promise<number>, Promise<string>]`，那么 `[key in keyof T]: Awaited<T[key]>;` 就是 `[number, string]`，相当于做了一个 `map`，不会改变 `T` 是一个元组类型的事实。

实现到这里，会发现第三个 case 不通过，我们的实现返回了 `Promise<number[]>`，但这道题期望我们返回 `Promise<[number, number, number]`。通过观察发现第三个 case 没有加 `as const`，所以 TypeScript 会把 `T` 推导成 `(number | Promise<number>)[]`，然后通过 `Awaited` 之后，就只剩下了 `number`。

所以我们需要完整地保留类型，这里需要用到一个特性叫做 [变长元组类型（Variadic Tuple Types）](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)。简单来说，变长元组类型通过 `[...T]` 的形式，将元组类型 `T` 展开成一个独立的元素列表。在处理变长参数时很有用，能够允许我们传递一个变长的参数列表，同时保留类型信息。

所以最终实现为：

```ts
declare function PromiseAll<T extends any[]>(
  values: [...T]
): Promise<{
  [key in keyof T]: Awaited<T[key]>;
}>;
```

## 参考链接

- [变长元组类型（Variadic Tuple Types）](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
- [映射类型](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
