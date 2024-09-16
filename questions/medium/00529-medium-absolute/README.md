---
title: Absolute
---

## 挑战

实现一个接收 string, number 或 bigInt 类型参数的`Absolute`类型,返回一个正数字符串。

例如

```ts
type Test = -100;
type Result = Absolute<Test>; // expected to be "100"
```

## 解答

这道题最开始想通过操作数字的方式实现，但想不到什么好的操作方式。后来看题目也接收 `string`，就想着用操作字符串的方式处理。

具体思路是通过推断得到第一个字符，判断它是不是 `-`，是的话返回剩余的部分，不是的话直接返回原字符串。

```ts
type Absolute<T extends number | string | bigint> =
  T extends `${infer F}${infer R}` ? (F extends '-' ? R : T) : never;
```

当然也可以简化一下：

```ts
type Absolute<T extends number | string | bigint> = T extends `-${infer R}`
  ? R
  : T;
```

但是现在处理不了 `T` 是数字的情况。所以我们需要把数字转成字符串，只需要把 `T` 包裹在字面量类型中。

所以最终实现为：

```ts
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
  ? R
  : `${T}`;
```

## 参考链接

- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
