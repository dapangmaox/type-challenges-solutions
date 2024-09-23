---
title: Merge
---

## 挑战

将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。

例如

```ts
type foo = {
  name: string;
  age: string;
};

type coo = {
  age: number;
  sex: string;
};

type Result = Merge<foo, coo>; // expected to be {name: string, age: number, sex: string}
```

## 解答

这个挑战和 `Append to object` 有些类似，我们使用 `keyof T`得到所有属性。

```ts
type Merge<F, S> = {
  [K in keyof F | keyof S]: never;
};
```

接下来获取对应 `K` 的值类型。这里要提的是，根据 test case，如果 `<F, S>` 中有相同的键，取 `S` 的值类型。所以我们先判断 `S` 是否有该属性。

```ts
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S ? S[K] : never;
};
```

如果 `S` 中没有该属性，我们检查 `F` 上是否存在该属性，如果存在，从 `F` 获取值类型。

```ts
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};
```

## 参考链接

- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [keyof and Lookup Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
