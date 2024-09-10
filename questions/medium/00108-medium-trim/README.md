---
title: Trim
---

## 挑战

实现`Trim<T>`，它接受一个明确的字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

例如

```ts
type trimed = Trim<'  Hello World  '>; // expected to be 'Hello World'
```

## 解答

这道题最简单粗暴的方式，直接在上一题 `TrimLeft` 的基础上，再加一步 `TrimRight` 就可以了。

```ts
type TrimLeft<S extends string> = S extends `${Space}${infer Rest}`
  ? TrimLeft<Rest>
  : S;

type TrimRight<S extends string> = S extends `${infer Rest}${Space}`
  ? TrimRight<Rest>
  : S;

type Trim<S extends string> = TrimRight<TrimLeft<S>>;
```

但我们可以把这个实现优化一下，通过使用联合类型模式匹配来同时处理字符串两端的空白符，从而减少递归次数，提高效率。

```ts
type Trim<S extends string> = S extends
  | `${Space}${infer Rest}`
  | `${infer Rest}${Space}`
  ? Trim<Rest>
  : S;
```

## 参考链接

- [模板字面量类型](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
