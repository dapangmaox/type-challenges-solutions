---
title: Push
---

## 挑战

在类型系统里实现通用的 `Array.push` 。

例如：

```typescript
type Result = Push<[1, 2], '3'>; // [1, 2, '3']
```

## 解答

```typescript
type Push<T extends any[], U> = [...T, U];
```
