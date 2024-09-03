---
title: Tuple To Object
---

## 挑战

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

例如：

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type result = TupleToObject<typeof tuple>; // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

## 解答

这道题需要得到一个对象类型，所以我们应该想到通过遍历元组 + 映射类型的方式，得到一个新的对象类型。

要从元组得到联合类型，在 `tuple-to-union` 题目里有解释过。

```ts
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};
```

这个答案会发现 `@ts-expect-error` case 仍然不通过。

```ts
// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;
```

是因为在 JavaScript 中，对象的属性键只能是字符串、数字或者 symbol。所以 extends 后面的 any 需要替换掉。

```ts
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [K in T[number]]: K;
};
```

TypeScript 内置了一个类型 `PropertyKey`：

```ts
type PropertyKey = string | number | symbol;
```

我们可以直接使用这个类型，所以最终实现为：

```ts
type TupleToObject<T extends readonly PropertyKey[]> = {
  [K in T[number]]: K;
};
```

## 参考链接

- [索引访问类型](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [映射类型](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
