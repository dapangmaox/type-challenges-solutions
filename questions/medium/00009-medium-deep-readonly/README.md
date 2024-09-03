---
title: Deep Readonly
---

## 挑战

实现一个泛型 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

```ts
type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
  };
  readonly y: 'hey';
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
```

## 解答

这道题和常规的 `Readonly<T>` 不同的是，我们需要让它递归化。

我们从常规的 `Readonly<T>` 开始：

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

这种实现只会把没有深度的字段设为只读，如果 `T[P]` 不是基本类型，而是一个对象时，会按原样传递，并且不会将其属性设为只读。

所以如果 `T[P]` 不是基本类型时，我们需要递归调用 `DeepReadonly<T>`，直到 `T[P]` 为基本类型。

判断 `T[P]` 是否为基本类型有多种写法，我这里使用了 `keyof T[P] extends never` 的写法。

所以最终实现为：

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};
```

## 参考链接

- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [递归条件类型](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
