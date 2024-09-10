---
title: Trimleft
---

## 挑战

实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

例如

```ts
type trimed = TrimLeft<'  Hello World  '>; // 应推导出 'Hello World  '
```

## 解答

当需要在类型中操作字符串时，大概率要用到[模板字面量类型](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)。

这道题可以用递归的思想来解。最左侧的字符串有两种情况：空格和非空格。如果是空格，我们需要推断出字符串的另一部分，并递归检查它是否有空格；如果不是空格，直接返回字符串。

```ts
type TrimLeft<S extends string> = S extends ` ${infer Rest}`
  ? TrimLeft<Rest>
  : S;
```

注意 ` ${infer Rest}` 前面是有一个空格的，为了更好的辨别，我们可以把空格声明称一个类型。

```ts
type Space = ' ';
type TrimLeft<S extends string> = S extends `${Space}${infer Rest}`
  ? TrimLeft<Rest>
  : S;
```

但是我们的 test cases 中还有一些字符也被当作字符串：`\n` 和 `\t`。所以我们再完善一下 `Space`。

完整实现为：

```ts
type Space = ' ' | `\n` | `\t`;
type TrimLeft<S extends string> = S extends `${Space}${infer Rest}`
  ? TrimLeft<Rest>
  : S;
```

## 参考链接

- [模板字面量类型](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
