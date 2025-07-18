---
title: Tuple To Nested Object
---

## 挑战

Given a tuple type `T` that only contains string type, and a type `U`, build an object recursively.

```typescript
type a = TupleToNestedObject<['a'], string>; // {a: string}
type b = TupleToNestedObject<['a', 'b'], number>; // {a: {b: number}}
type c = TupleToNestedObject<[], boolean>; // boolean. if the tuple is empty, just return the U type
```

## 解答

我们需要将元组类型 `T` 转换为嵌套对象类型，其中元组的每个元素作为对象的嵌套键，最终值类型为 `U`。处理逻辑如下：

1. **递归终止条件**：当元组 `T` 为空时，直接返回类型 `U`
2. **递归分解**：将元组拆分为第一个元素 `First` 和剩余部分 `Rest`
3. **对象构建**：使用映射类型语法，以 `First` 作为键，递归处理剩余部分 `Rest` 作为值
4. **类型约束**：通过 `First & PropertyKey` 确保键类型有效（`string | number | symbol`）

### 具体实现

```typescript
type TupleToNestedObject<T, U> = T extends [infer First, ...infer Rest]
  ? { [K in First & PropertyKey]: TupleToNestedObject<Rest, U> }
  : U;
```

### 代码解析

1. **条件类型检查**：

   ```typescript
   T extends [infer First, ...infer Rest]
   ```

   检查元组 `T` 是否可拆分为第一个元素 `First` 和剩余元组 `Rest`

2. **递归构建对象**：

   ```typescript
   { [K in First & PropertyKey]: TupleToNestedObject<Rest, U> }
   ```

   - 将 `First` 约束为有效的键类型（`PropertyKey`）
   - 值类型是递归处理剩余元组 `Rest` 的结果

3. **递归终止**：
   ```typescript
   : U;
   ```
   当元组为空时，直接返回最终类型 `U`
