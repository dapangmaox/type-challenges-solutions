---
title: Partialbykeys
---

## 挑战

实现一个通用的`PartialByKeys<T, K>`，它接收两个类型参数`T`和`K`。

`K`指定应设置为可选的`T`的属性集。当没有提供`K`时，它就和普通的`Partial<T>`一样使所有属性都是可选的。

例如:

```ts
interface User {
  name: string;
  age: number;
  address: string;
}

type UserPartialName = PartialByKeys<User, 'name'>; // { name?:string; age:number; address:string }
```

## 解答

这道题我们可以根据 `K` 把属性分成两部分，一部分是可选的，一部分是必选的。然后再把这两部分合并起来。

```ts
type PartialByKeys<T, K> = {
  [P in keyof T as P extends K ? P : never]?: T[P];
} & {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

但是题目要求我们返回的是一整个对象，所以我们需要把这两部分合并起来。

我们创建一个辅助类型 `IntersectionToObj` 来合并这两部分。

```ts
type IntersectionToObj<T> = {
  [P in keyof T]: T[P];
};

type PartialByKeys<T, K> = IntersectionToObj<
  {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;
```

再完善一下，当 `K` 没有传入时，我们需要给 `K` 一个默认值。

```ts
type PartialByKeys<T, K extends keyof T = keyof T> = IntersectionToObj<
  {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;
```

最后，我们也可以使用内置的 `Exclude` 来简化这个实现。

```ts
type PartialByKeys<T, K extends keyof T = keyof T> = IntersectionToObj<
  {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in Exclude<keyof T, K>]: T[P];
  }
>;

type IntersectionToObj<T> = {
  [P in keyof T]: T[P];
};
```
