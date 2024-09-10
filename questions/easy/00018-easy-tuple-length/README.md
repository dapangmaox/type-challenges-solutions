---
title: Tuple Length
---

## 挑战

创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

例如：

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y'];
type spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT'
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

## 解答

我们知道在 JavaScript 中可以使用属性 `length` 来访问数组的长度。我们也可以在类型上做同样的事情:

```ts
type Length<T> = T['length'];
```

但是我们会得到一个编译错误：`Type '"length"' cannot be used to index type 'T'.`。因为我们没有对 `T` 做限制。

```ts
type Length<T extends readonly any[]> = T['length'];
```

## 参考链接

- [索引访问类型](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
