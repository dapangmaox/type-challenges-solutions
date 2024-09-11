---
title: Awaited
---

## 挑战

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise<T> 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

```ts
type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
```

> 这个挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 的文章：[original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4)

## 解答

这道题需要我们从一个类型中提取内部类型。假如有一个类型 `Promise<string>`，那么提取之后就是 `string`。

对应到我们的 `MyAwaited<T>` 类型，如果 `T` 是 `Promise<string>`，那么返回 `string`，否则返回 `T` 本身，因为它不是一个 Promise。

但现在我们不知道 `Promise` 具体的类型，这里可以使用类型推断。

```ts
type MyAwaited<T> = T extends Promise<infer U> ? U : T;
```

还有一点，如果 `Promise<infer U>` 推断出来的还是 Promise，我们需要递归处理，直到推断出来的类型不是 Promise。

```ts
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;
```

实现到这里，还有一个 test case 报错：

```ts
type T = { then: (onfulfilled: (arg: number) => any) => any };
```

想一下我们在 JavaScript 中是怎么判断一个对象是不是 Promise 的，我们一般会判断有没有 `then` 方法，就是对应的这个 case。

所以我们使用 `Promise` 类型不能完全覆盖测试用例，好在 TypeScript 给我们提供了一个内置类型：`PromiseLike`。我们需要用 `PromiseLike` 替换掉 `Promise`。

最终实现：

```ts
type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;
```

## 参考链接

- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [infer](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
