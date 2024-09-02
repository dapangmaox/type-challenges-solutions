---
title: Readonly
---

## 挑战

不要使用内置的`Readonly<T>`，自己实现一个。

泛型 `Readonly<T>` 会接收一个 _泛型参数_，并返回一个完全一样的类型，只是所有属性都会是只读 (readonly) 的。

也就是不可以再对该对象的属性赋值。

例如：

```ts
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
```

## 解答

要实现一个 `Readonly<T>`，可以使用映射类型。我们只需要遍历 `T` 的所有属性，并将它们标记为 `readonly`。

```typescript
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## 参考链接

- [映射类型](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
