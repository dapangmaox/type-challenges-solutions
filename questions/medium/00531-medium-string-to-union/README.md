---
title: String To Union
---

## 挑战

实现一个将接收到的 String 参数转换为一个字母 Union 的类型。

例如

```ts
type Test = '123';
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
```

## 解答

这道题我们需要遍历字符串，把每个字符加到联合类型中。

```ts
type StringToUnion<T extends string> = T extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never;
```

## 参考链接

- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
- [Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)
- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
