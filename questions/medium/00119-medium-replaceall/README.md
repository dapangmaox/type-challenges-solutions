---
title: Replaceall
---

## 挑战

实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。

例如

```ts
type replaced = ReplaceAll<'t y p e s', ' ', ''>; // 期望是 'types'
```

## 解答

这道题只需要在上一题 `Replace` 的基础上，加上递归调用即可。

```ts
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${ReplaceAll<R, From, To>}`
  : S;
```

## 参考链接

- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [模板字面量类型](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
