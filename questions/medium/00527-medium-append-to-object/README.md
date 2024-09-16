---
title: Append To Object
---

## 挑战

实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型。

例如:

```ts
type Test = { id: '1' };
type Result = AppendToObject<Test, 'value', 4>; // expected to be { id: '1', value: 4 }
```

## 解答

这道题我首先想到了使用交叉类型。

```ts
type AppendToObject<T, U extends PropertyKey, V> = T & { [key in U]: V };
```

但是不满足测试用例，测试用例希望我们返回普通类型而不是交叉类型。所以我们需要返回一个对象，里面包含所有属性和新加的属性。我们可以先从映射 `T` 的属性开始。

```ts
type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof T]: T[K];
};
```

现在我们要把新字段加进去。我们知道 `keyof T` 是一个联合类型，可以直接加入新字段。

```ts
type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof T | U]: T[K];
};
```

现在值的类型就不能一直是 `T[K]` 了，如果 `K` 来自于 `keyof T` 那么就是 `T[K]`，否则返回 `V`。

所以最终实现为：

```ts
type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
};
```

## 参考链接

- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
