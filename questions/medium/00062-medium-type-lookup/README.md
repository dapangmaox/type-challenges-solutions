---
title: Type Lookup
---

## 挑战

有时，您可能希望根据某个属性在联合类型中查找类型。

在此挑战中，我们想通过在联合类型`Cat | Dog`中通过指定公共属性`type`的值来获取相应的类型。换句话说，在以下示例中，`LookUp<Dog | Cat, 'dog'>`的结果应该是`Dog`，`LookUp<Dog | Cat, 'cat'>`的结果应该是`Cat`。

```ts
interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type MyDog = LookUp<Cat | Dog, 'dog'>; // expected to be `Dog`
```

## 解答

这道题就是在 `Exclude` 的基础上换了个复杂一点的判断条件，我们只需要判断联合类型的每个元素，是不是有 `type` 属性以及值是不是要查询的值。

```ts
type LookUp<U, T> = U extends { type: T } ? U : never;
```

## 参考链接

- [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
