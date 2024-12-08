---
title: Percentage Parser
---

## 挑战

实现类型 `PercentageParser<T extends string>`。根据规则 `/^(\+|\-)?(\d*)?(\%)?$/` 匹配类型 `T`。

匹配的结果由三部分组成，分别是：[`正负号`, `数字`, `单位`]，如果没有匹配，则默认是空字符串。

例如：

```ts
type PString1 = '';
type PString2 = '+85%';
type PString3 = '-85%';
type PString4 = '85%';
type PString5 = '85';

type R1 = PercentageParser<PString1>; // expected ['', '', '']
type R2 = PercentageParser<PString2>; // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3>; // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4>; // expected ["", "85", "%"]
type R5 = PercentageParser<PString5>; // expected ["", "85", ""]
```

## 解答

这道题并不难，但思路比较重要。

我们要把字符串分成三部分，并且不存在的部分默认为空字符串。我们可以按照如下步骤来实现：

1. 首先判断第一个字符是否是正负号，如果是，那么第一部分是第一个字符，否则默认为空字符串。

```ts
type CheckPrefix<T> = T extends '+' | '-' ? T : never;
```

现在我们已经确定了第一部分，接下来我们要确定剩余部分。需要注意的是，如果第一步中的第一个字符是正负号，那么剩余部分从第二个字符开始，如果不是，那么从第一个字符开始。

2. 现在我们要确认第二部分和第三部分，我们可以通过判断字符串是不是以 `%` 结尾来确定。

- 如果是，那么第三部分就是 `%`，前面的字符串为第二部分。
- 如果不是，那么整个字符串就是第二部分，第三部分默认为空字符串。

```ts
type CheckSuffix<T> = T extends `${infer P}%` ? [P, '%'] : [T, ''];

type PercentageParser<A extends string> = A extends `${infer L}${infer R}`
  ? L extends '+' | '-'
    ? [L, ...CheckSuffix<R>]
    : ['', ...CheckSuffix<A>]
  : ['', '', ''];
```
