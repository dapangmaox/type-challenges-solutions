---
title: Pick
---

## 挑战

不使用 `Pick<T, K>` ，实现 TS 内置的 `Pick<T, K>` 的功能。

**从类型 `T` 中选出符合 `K` 的属性，构造一个新的类型**。

例如：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

## 解答

为了解出这个挑战，我们需要使用索引访问类型和映射类型。

我们需要从联合类型 `K` 中遍历每一个键，并返回一个仅包含这些键的新类型。

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

## 参考

- [索引访问类型](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [映射类型](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
