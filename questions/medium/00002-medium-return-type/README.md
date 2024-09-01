---
title: Return Type
---

## 挑战

不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。

例如：

```ts
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"
```

## 解答

这道题可以利用**条件类型**和 **`infer`** 关键字。

### 第一步：定义泛型类型

首先，我们需要定义一个泛型类型 `MyReturnType<T>`。这个类型将接受一个类型参数 `T`，并根据 `T` 的类型来推断返回值的类型。

```typescript
type MyReturnType<T> = any;
```

### 第二步：使用条件类型

我们需要使用条件类型来检查 `T` 是否是一个函数类型。条件类型的语法是 `T extends U ? X : Y`，其中如果 `T` 可以赋值给 `U`，则返回 `X`，否则返回 `Y`。

```typescript
type MyReturnType<T> = T extends (...args: any[]) => any ? any : never;
```

### 第三步：使用 `infer` 关键字

为了提取函数的返回类型，我们可以使用 `infer` 关键字。`infer` 关键字允许我们在条件类型中引入一个待推断的类型变量。

我们将 `any` 替换为 `infer R`，其中 `R` 是我们要推断的返回类型：

```typescript
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### 最终实现

完整代码如下：

```typescript
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

## 参考链接

- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
