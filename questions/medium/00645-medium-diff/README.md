---
title: Diff
---

## 挑战

获取两个接口类型中的差值属性。

```ts
type Foo = {
  a: string;
  b: number;
};
type Bar = {
  a: string;
  c: boolean;
};

type Result1 = Diff<Foo, Bar>; // { b: number, c: boolean }
type Result2 = Diff<Bar, Foo>; // { b: number, c: boolean }
```

## 解答

要找到差值属性，我们首先要得到两个对象的所有属性。

```ts
type Diff<O, O1> = {
  [P in keyof (O & O1)]: never;
};
```

接下来我们筛选差值属性。

对于任意一个属性，有三种可能：

1. 只存在于 `O` 中
2. 只存在于 `O1` 中
3. 既存在于 `O` 中，也存在于 `O1` 中

我们可以先判断该属性是不是在 `O` 中。如果不在，肯定只属于 `O1`，是我们想要的属性；如果在 `O` 中，再判断是不是在 `O1` 中，如果不在，说明只存在于 `O` 中，也是我们想要的属性，否则舍弃掉。

```ts
type Diff<O, O1> = {
  [P in keyof (O & O1) as P extends keyof O
    ? P extends keyof O1
      ? never
      : P
    : P]: never;
};
```

现在我们得到了所有差值属性，接下来给属性加上对应的类型。

```ts
type Diff<O, O1> = {
  [P in keyof (O & O1) as P extends keyof O
    ? P extends keyof O1
      ? never
      : P
    : P]: P extends keyof O ? O[P] : P extends keyof O1 ? O1[P] : never;
};
```

这道题在 [Issue](https://github.com/type-challenges/type-challenges/issues/3014) 区还有一个更精妙的答案，这里直接贴出来。

```ts
// O&O1 - O|O1
// & means 'either has', | means 'both have'
type Diff<O, O1> = {
  [K in keyof (O & O1) as K extends keyof (O | O1) ? never : K]: (O & O1)[K];
};
```

核心就是 `keyof (O | O1)` 会得到两者都有的属性，具体的解释大家可以去 GitHub 查看。

## 参考链接

- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Key remapping in Mapped Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)
- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
- [Index Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [keyof and Lookup Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
