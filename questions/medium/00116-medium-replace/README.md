---
title: Replace
---

## 挑战

实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

例如

```ts
type replaced = Replace<'types are fun!', 'fun', 'awesome'>; // 期望是 'types are awesome!'
```

## 解答

我们要把某部分替换成另一部分，这意味着我们需要将输入字符串分成三部分，并对每一部分进行推断。

我们从字符串左边开始推断，直到找到 `From`，`From` 右边的内容又是另一部分。

```ts
type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${From}${infer R}` ? S : S;
```

我们会通过条件类型检查字符串 `S` 是否可以被拆分为 `L`、`From` 和 `R` 三部分。一旦推断成功，我们就可以通过构造模板字面量的各个部分，并用 `To` 替换掉 `From` 部分来返回一个新的模板字面量。

```ts
type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${From}${infer R}` ? `${L}${To}${R}` : S;
```

还有一种特殊情况需要处理，如果 `From` 是空字符串，不需要做替换。

所以最终实现为：

```ts
type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${R}`
  : S;
```

## 参考链接

- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [模板字面量类型](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
