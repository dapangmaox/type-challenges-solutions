---
title: Unshift
---

## 挑战

实现类型版本的 `Array.unshift`。

例如：

```typescript
type Result = Unshift<[1, 2], 0>; // [0, 1, 2]
```

## 解答

```typescript
type Unshift<T extends any[], U> = [U, ...T];
```
