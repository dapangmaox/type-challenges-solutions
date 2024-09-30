---
title: Includes
---

## 挑战

在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。

例如：

```ts
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`
```

## 解答

这道题最开始只有几个很简单的测试用例，比如：

```ts
Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
```

基于上面的例子，先来看一下最开始的思路，要从数组中找到某个元素，一个简单的做法是通过 `Array[number]` 把数组转换成联合类型，再通过 `U extends Array[number]` 来判断我们要找的 `U` 是否存在于这个联合类型中。

```ts
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;
```

但实际情况是，这这道题现在加入了一些不能通过 `extends` 来判断的例子，比如：

```ts
Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
```

我们知道，`false extends boolean` 是成立的，但是这道题的 includes 需要的是相等关系。所以我们需要借助于一个项目中提供的类型 `Equal`，用来判断两个类型是否相等。`Equal` 的实现如下：

```ts
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;
```

有了 `Equal` 之后，我们换一种实现方式。把数组中的元素挨个拿出来去比较，如果找到了相等的元素，说明 includes 关系成立，如果遍历玩所有数组元素还没找到，那么 includes 为 false。

```ts
type Includes<T extends readonly unknown[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
```
