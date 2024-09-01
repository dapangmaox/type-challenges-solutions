---
title: Omit
---

## 挑战

不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

例如：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

const todo: TodoPreview = {
  completed: false,
};
```

## 解答

这道题需要返回一个新的对象类型，但不指定键，所以我们应该想到用**映射类型**。

### 第一步：定义泛型类型

首先，我们需要定义一个泛型类型 `MyOmit<T, K>`。这个类型将接受两个类型参数 `T` 和 `K`，并根据 `K` 的类型来省略 `T` 中的字段。

```typescript
type MyOmit<T, K> = any;
```

### 第二步：使用 `keyof` 和 `Exclude`

接下来使用 `keyof` 操作符来获取 `T` 的所有键，并使用 `Exclude` 类型来排除 `K` 中的键。

- `keyof T`：获取类型 `T` 的所有键。
- `Exclude<UnionType, ExcludedMembers>`：从 `UnionType` 中排除 `ExcludedMembers`。

```typescript
type MyOmit<T, K> = {
  [P in Exclude<keyof T, K>]: T[P];
};
```

用这个答案去测试会发现，有两个 case 不通过。

```typescript
Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>;

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>;
```

第二个问题是因为我们没有限制联合类型 `K` 必须是 `T` 的属性，可以使用 `extends` 加以限制。

```typescript
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
```

### 第二步：使用 `as`

第一个问题比较棘手，因为现在的实现方式是构造了一个新的类型，会丢失原本 `T` 类型属性的修饰符。（如 readonly 和 ? 可选属性）。

为了保留原本 `T` 类型属性的修饰符（如 readonly 和 ? 可选属性），我们可以使用 `as` 映射来重新映射键，并保留原始属性的修饰符。

```typescript
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

### 最终实现

完整代码如下：

```typescript
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

## 参考链接

- [映射类型](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [as 映射](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)
