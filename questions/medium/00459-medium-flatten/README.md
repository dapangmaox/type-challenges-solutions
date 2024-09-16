---
title: Flatten
---

## 挑战

在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

例如:

```ts
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
```

## 解答

返回扁平化的数组，这个方法的 js 版本相信大家都写过。

```ts
function flattenArray(arr) {
  // 使用 reduce 方法遍历数组
  return arr.reduce((acc, val) => {
    // 如果当前元素是数组，则递归调用 flattenArray
    if (Array.isArray(val)) {
      acc.push(...flattenArray(val));
    } else {
      // 否则直接将元素添加到结果数组中
      acc.push(val);
    }
    return acc;
  }, []);
}

// 示例用法
const nestedArray = [1, [2, [3, [4]], 5]];
const flatArray = flattenArray(nestedArray);
console.log(flatArray); // 输出: [1, 2, 3, 4, 5]
```

我们可以直接根据这个函数，把它翻译成 TypeScript 类型版本。

我们需要两个泛型，一个代表输入数组 `T`，一个代表结果 `R`。

```ts
type Flatten<T extends any[], R extends any[] = []> = R;
```

接下来我们使用递归和条件类型来遍历数组，把每次遍历得到的结果累加到 `R`（先不考虑单个元素是数组还是单个值）。

```ts
type Flatten<T extends any[], R extends any[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? Flatten<Rest, [...R, First]>
  : R;
```

这样我们就把数组 `T` 中的所有元素放到了 `R` 中。现在有些 test case 已经可以通过了，但是还不能解决 `T` 中的元素带有数组的情况。

我们需要对 `First` 进行判断，如果是数组，也递归调用 `Flatten`。

```ts
type Flatten<T extends any[], R extends any[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends any[]
    ? Flatten<Rest, [...R, ...Flatten<First, []>]>
    : Flatten<Rest, [...R, First]>
  : R;
```

## 参考链接

- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
- [Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
- [Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
