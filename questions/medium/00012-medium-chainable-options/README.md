---
title: Chainable Options
---

## 挑战

在 JavaScript 中我们经常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给它赋上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 `option(key, value)` 和 `get()`。在 `option` 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 `get` 获取最终结果。

例如

```ts
declare const config: Chainable;

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// 期望 result 的类型是：
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
```

你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

你可以假设 `key` 只接受字符串而 `value` 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 `key` 只会被使用一次。

## 解答

这道题要求我们实现两个函数 `option(key, value)` 和 `get()`。每次调用 `option(key, value)` 都必须在某处累加 `key` 和 `value` 的类型信息。累加操作必须持续进行，直到调用 `get` 函数将累加的信息作为一个对象类型返回。

让我们从提供的接口开始：

```ts
type Chainable = {
  option(key: string, value: any): any;
  get(): any;
};
```

在我们开始累加类型信息前，需要先得到类型，所以我们把 `key: string, value: any` 替换成带类型的，这样 TypeScript 可以推断类型。

```ts
type Chainable = {
  option<K, V>(key: K, value: V): any;
  get(): any;
};
```

有了类型信息后，我们需要把它存储起来，我们需要一个在若干次函数调用中保持状态的地方。可以利用 `Chainable` 类型本身。

我们给 `Chainable` 类型添加一个新的类型参数 `T`，并且默认是一个空对象。

```ts
type Chainable<T = {}> = {
  option<K, V>(key: K, value: V): any;
  get(): any;
};
```

接下来，因为需要链式调用，所以我们知道 `option<K, V>` 应该返回 `Chainable` 类型本身，并且通过交叉类型将类型信息累加到类型中。

```ts
type Chainable<T = {}> = {
  option<K, V>(key: K, value: V): Chainable<T & { [key in K]: V }>;
  get(): any;
};
```

这时有一个小错误，`Type 'K' is not assignable to type 'string | number | symbol'.ts(2322)`，因为我们没有约束 `K`。

```ts
type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K,
    value: V
  ): Chainable<T & { [key in K]: V }>;
  get(): any;
};
```

接下来因为 `get()` 函数可以得到类型，我们直接返回 `T`。

```ts
type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K,
    value: V
  ): Chainable<T & { [key in K]: V }>;
  get(): T;
};
```

这时会发现有些 test cases 还是不通过，因为我们没有对 `K` 做检验，如果 `T` 的属性中已经包含了 `K`，那么这时候需要报错。我们需要对 `K` 进行约束。

```ts
type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ): Chainable<T & { [key in K]: V }>;
  get(): T;
};
```

现在发现第三个 case 还是不过，仔细观察发现，当传入了存在的 `key`，如果 `value` 的类型不一致，是会被新类型覆盖的，而不是得到两个一样的 `key`。

我们可以使用 `Omit` 来把同样的 `key` 删掉。所以最终实现为：

```ts
type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ): Chainable<Omit<T, K> & { [key in K]: V }>;
  get(): T;
};
```

## 参考链接

- [交叉类型](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
- [映射类型](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [范型](https://www.typescriptlang.org/docs/handbook/2/generics.html)
