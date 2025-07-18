---
title: Reverse
---

## 挑战

实现类型版本的数组反转 `Array.reverse`

例如：

```typescript
type a = Reverse<['a', 'b']>; // ['b', 'a']
type b = Reverse<['a', 'b', 'c']>; // ['c', 'b', 'a']
```

## 解答

我们需要实现一个类型级别的数组反转操作，核心思路是通过递归逐步处理数组元素。具体步骤：

1. **递归分解数组**：每次取出数组的第一个元素和剩余部分
2. **递归反转剩余数组**：对剩余数组进行递归反转
3. **组合结果**：将取出的第一个元素追加到已反转的剩余数组的末尾
4. **终止条件**：当数组为空时直接返回空数组

### 具体实现

```typescript
type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : [];
```

### 代码解析

1. **类型约束**：

   ```typescript
   T extends any[]
   ```

   确保输入类型必须是数组类型，满足题目要求（非数组类型会触发类型错误）

2. **递归分解**：

   ```typescript
   T extends [infer First, ...infer Rest]
   ```

   使用条件类型和`infer`关键字：

   - `First`：获取数组的第一个元素类型
   - `Rest`：获取剩余数组类型

3. **递归反转**：

   ```typescript
   [...Reverse<Rest>, First];
   ```

   - 先递归反转剩余数组`Rest`
   - 然后将取出的第一个元素`First`追加到反转后的数组末尾

4. **终止条件**：
   ```typescript
   : [];
   ```
   当数组为空时，返回空数组，结束递归

### 递归过程示例

以 `Reverse<['a', 'b', 'c']>` 为例：

1. 第一次调用：

   ```ts
   First = 'a', Rest = ['b','c']
   → [...Reverse<['b','c']>, 'a']
   ```

2. 第二次调用：

   ```ts
   First = 'b', Rest = ['c']
   → [...Reverse<['c']>, 'b']
   ```

3. 第三次调用：

   ```ts
   First = 'c', Rest = []
   → [...Reverse<[]>, 'c'] → [...[], 'c'] = ['c']
   ```

4. 逐层返回：
   ```ts
   ['c'] → ['c','b'] → ['c','b','a']
   ```

最终得到反转后的数组 `['c','b','a']`。
