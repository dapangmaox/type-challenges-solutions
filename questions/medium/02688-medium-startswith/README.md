---
title: Startswith
---

## 挑战

实现`StartsWith<T, U>`,接收两个 string 类型参数,然后判断`T`是否以`U`开头,根据结果返回`true`或`false`

例如:

```typescript
type a = StartsWith<'abc', 'ac'>; // expected to be false
type b = StartsWith<'abc', 'ab'>; // expected to be true
type c = StartsWith<'abc', 'abcd'>; // expected to be false
```

## 解答

这道题可以通过条件类型来解决。我们可以通过检查`T`的前缀是否等于`U`来实现。

```typescript
type StartsWith<T extends string, U extends string> = T extends `${U}${infer _}`
  ? true
  : false;
```
