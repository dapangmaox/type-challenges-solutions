---
title: Length Of String
---

## 挑战

计算字符串的长度，类似于 `String#length` 。

## 解答

这道题最开始我想着能不能直接通过索引类型度 `length` 属性，如果 TypeScript 够聪明的话直接得到结果。

```ts
type LengthOfString<S extends string> = S['length'];
```

后来发现想多了，推断出来的类型是 `number`。

那现在我们换种方式，一般要获取长度，在 TypeScript 类型里最常见的就是获取数组的长度，所以我想能不能先把 `string` 转换成元组，最后读取这个元组的 `length`。

我们每次从字符串 `S` 中取出第一个字符，添加到元组，直到 `S` 为空。

```ts
type StringToTuple<S extends string> = S extends `${infer F}${infer R}`
  ? [F, ...StringToTuple<R>]
  : [];
```

然后直接读取这个类型的 `length` 属性。

```ts
type StringToTuple<S extends string> = S extends `${infer F}${infer R}`
  ? [F, ...StringToTuple<R>]
  : [];
type LengthOfString<S extends string> = StringToTuple<S>['length'];
```

其实这样就可以了，不过网上有些答案把两个类型合并成了一个类型，但是需要加一个辅助泛型，用来保存元组。

```ts
type LengthOfString<
  S extends string,
  T extends string[] = []
> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...T, F]>
  : T['length'];
```

## 参考链接

- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
- [Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)
- [Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
- [Index Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
