---
title: Capitalize
---

## 挑战

实现 `Capitalize<T>` 它将字符串的第一个字母转换为大写，其余字母保持原样。

例如

```ts
type capitalized = Capitalize<'hello world'>; // expected to be 'Hello world'
```

## 解答

要获取第一个字母，我们需要用到模板字符串类型和条件类型。要把第一个字母转换成大写，可以使用内置的 `Uppercase` 类型。

```ts
type MyCapitalize<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : T;
```

## 参考链接

- [模板字面量类型](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
