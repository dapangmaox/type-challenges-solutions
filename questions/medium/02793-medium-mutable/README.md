---
title: Mutable
---

## 挑战

实现一个通用的类型 `Mutable<T>`，使类型 `T` 的全部属性可变（非只读）。

例如：

```typescript
interface Todo {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
}

type MutableTodo = Mutable<Todo>; // { title: string; description: string; completed: boolean; }
```

## 解答

要把一个类型的所有属性都变成可变的，我们可以理解成把所有属性去掉 `readonly` 修饰符。

```typescript
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

这里使用了 `-` 操作符来去掉 `readonly` 修饰符，是一种固定的写法。

根据测试用例，我们还需要对 `T` 做限制，`T` 必须是一个对象类型。

```typescript
type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K];
};
```
