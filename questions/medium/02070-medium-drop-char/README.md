---
title: Drop Char
---

## 挑战

从字符串中剔除指定字符。

例如：

```ts
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '>; // 'butterfly!'
```

## 解答

要从字符中剔除指定字符，我们当然要找到这个字符。我们可以通过递归判断字符串是否匹配模式 `${infer Left}${C}${infer Right}`。

```ts
type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}`
  ? DropChar<`${L}${R}`, C>
  : S;
```
