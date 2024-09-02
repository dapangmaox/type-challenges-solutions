---
title: Readonly 2
---

## 挑战

实现一个泛型`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

类型 `K` 指定 `T` 中要被设置为只读 (readonly) 的属性。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

例如

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
```

## 解答

这道题在 `Readonly<T>` 的基础上添加了一个新的类型参数 `K`，可以让我们将指定的属性设置为只读。我们可以基于 `Readonly<T>` 来修改。

```typescript
type MyReadonly2<T, K> = {
  readonly [P in keyof T]: T[P];
};
```

因为只有 `K` 中的属性会被设置成 readonly，所以我们把 `T` 中的属性分成两部分，`K` 和 另外的部分，另外的部分可以通过 `Omit<T, K>` 得到。要将两部分合并成一个类型，可以使用**交叉类型**。因此我们将 `MyReadonly2<T, K>` 修改为这样：

```typescript
type MyReadonly2<T, K> = {
  readonly [P in K]: T[P];
} & Omit<T, K>;
```

现在 TS 会报一个错误：Type 'P' cannot be used to index type 'T'. 因为我们还没有对 `K` 进行约束，`K` 应该是 `T` 中的键。

```typescript
type MyReadonly2<T, K extends keyof T> = {
  readonly [P in K]: T[P];
} & Omit<T, K>;
```

现在还有一个 test case 报错，因为题目提到了如果未提供 `K`，则应使所有属性都变为只读。所以我们需要给 `K` 指定默认值。

所以最终实现为：

```typescript
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & Omit<T, K>;
```

## 参考链接

- [交叉类型](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
- [映射类型](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [索引访问类型](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
