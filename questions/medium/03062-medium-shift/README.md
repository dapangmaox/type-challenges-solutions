---
title: Shift
---

## 挑战

Implement the type version of `Array.shift`

For example

```typescript
type Result = Shift<[3, 2, 1]>; // [2, 1]
```

## 解答

`Array.shift` 方法会移除数组中的第一个元素，并返回移除的元素。我们可以使用元组的解构来实现这个功能。

```typescript
type Shift<T extends any[]> = T extends [infer _, ...infer R] ? R : [];
```
