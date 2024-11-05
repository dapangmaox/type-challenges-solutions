---
title: Endswith
---

## 挑战

实现`EndsWith<T, U>`,接收两个 string 类型参数,然后判断`T`是否以`U`结尾,根据结果返回`true`或`false`

例如:

```typescript
type a = EndsWith<'abc', 'bc'>; // expected to be true
type b = EndsWith<'abc', 'abc'>; // expected to be true
type c = EndsWith<'abc', 'd'>; // expected to be false
```

## 解答

这道题可以使用条件类型和模板字符串类型来解决。

模板字面量类型允许我们进行类型推断，我们可以将字符串拆分成两部分，然后使用条件类型判断第二部分是否等于`U`即可。

```typescript
type EndsWith<T extends string, U extends string> = T extends `${infer _}${U}`
  ? true
  : false;
```
