---
title: Simple Vue
---

## 挑战

实现类似 Vue 的类型支持的简化版本。

通过提供一个函数`SimpleVue`（类似于`Vue.extend`或`defineComponent`），它应该正确地推断出 computed 和 methods 内部的`this`类型。

在此挑战中，我们假设`SimpleVue`接受只带有`data`，`computed`和`methods`字段的 Object 作为其唯一的参数，

- `data`是一个简单的函数，它返回一个提供上下文`this`的对象，但是你无法在`data`中获取其他的计算属性或方法。

- `computed`是将`this`作为上下文的函数的对象，进行一些计算并返回结果。在上下文中应暴露计算出的值而不是函数。

- `methods`是函数的对象，其上下文也为`this`。函数中可以访问`data`，`computed`以及其他`methods`中的暴露的字段。 `computed`与`methods`的不同之处在于`methods`在上下文中按原样暴露为函数。

`SimpleVue`的返回值类型可以是任意的。

```ts
const instance = SimpleVue({
  data() {
    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname;
    },
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase());
    },
  },
});
```

## 解答

根据题目描述，函数 `SimpleVue` 有三个部分：`data`, `computed` 和 `methods`。

所以我们的函数长这样：

```ts
declare function SimpleVue(options: {
  data: void;
  computed: void;
  methods: void;
}): any;
```

那么我们根据泛型来接受它的参数，再通过题目的意思一一返回。

```ts
declare function SimpleVue<TData, TComputed, TMethods>(options: {
  data: void;
  computed: void;
  methods: void;
}): any;
```

### `data`

题目描述：`data` 是一个简单的函数，它返回一个提供上下文 `this` 的对象，但是你无法在 `data` 中获取其他的计算属性或方法。

来逐句分析一下：

1.  一个简单的函数

```ts
data: () => any;
```

2.  它返回一个提供上下文 `this` 的对象

也就是说 `data` 的会返回一个对象，我们把它给到 `TData`，之后在 `computed` 和 `methods` 中会用到。

```ts
data: () => TData;
```

3.  但是你无法在 `data` 中获取其他的计算属性或方法

意思是函数内部不依赖于任何对象的 `this` 上下文，即不使用对象的属性或方法。测试用例中也可以看到，在 `data` 中任何 `this.xxx` 都应该报错。

```ts
data() {
  // @ts-expect-error
  this.firstname;
  // @ts-expect-error
  this.getRandom();
  // @ts-expect-error
  this.data();

  return {
    firstname: 'Type',
    lastname: 'Challenges',
    amount: 10,
  };
}
```

要做到这一点，可以使用 `this: void` 实现。以下是来自 ChatGPT 的回答：

> 在 TypeScript 中，`this: void` 是一种函数签名的写法，表示函数不期望在其执行期间引用任何特定的 `this` 上下文。它指定了函数在被调用时，`this` 的类型为 `void`，即不允许使用任何对象的上下文。

所以 `data` 的类型为：

```ts
declare function SimpleVue<TData, TComputed, TMethods>(options: {
  data: (this: void) => TData;
  computed: void;
  methods: void;
}): any;
```

### computed

题目描述：`computed` 是将 `this` 作为上下文的函数的对象，进行一些计算并返回结果。在上下文中应暴露计算出的值而不是函数。

逐句分析一下：

1.  将 `this` 作为上下文的函数的对象

这里的 `this` 指的是 `data` 函数中返回的对象，也就是 `TData`。

要将 `TData` 作为 `computed` 的上下文，需要用到 `ThisType` 类型。关于 `ThisType` 的定义，我在网上找到了一个容易理解的解释：

> 如果将 `& ThisType<WhateverYouWantThisToBe>` 添加到对象的类型，则该对象内的函数将使用 `WhateverYouWantThisToBe` 作为 `this` 的类型。

同样的，我们把 `computed` 的类型给到 `TComputed`，在之后的 `methods` 里会用到。

所以 `computed` 的类型为：

```ts
declare function SimpleVue<TData, TComputed, TMethods>(options: {
  data: (this: void) => TData;
  computed: TComputed & ThisType<TData>;
  methods: void;
}): any;
```

2.  在上下文中应暴露计算出的值而不是函数。

这个是指在 `methods` 中，只能得到 `computed` 对象中的函数的返回值类型，我们会在 `methods` 中实现。

### methods

最后是 `methods` 部分，也是本道题较为复杂的一部分。

题目描述：

`methods` 是函数的对象，其上下文也为 `this`。函数中可以访问 `data`，`computed` 以及其他 `methods` 中的暴露的字段。 `computed` 与 `methods` 的不同之处在于 `methods` 在上下文中按原样暴露为函数。

还是老规矩，逐句解析：

1.  `methods` 是函数的对象，其上下文也为 `this`。

写 `computed` 的时候已经解释过了，直接写：

```ts
declare function SimpleVue<TData, TComputed, TMethods>(options: {
  data: (this: void) => TData;
  computed: TComputed & ThisType<TData>;
  methods: TMethods & ThisType<TData>;
}): any;
```

2. 函数中可以访问 `data`，`computed` 以及其他 `methods` 中的暴露的字段。 `computed` 与 `methods` 的不同之处在于 `methods` 在上下文中按原样暴露为函数。

我们把最后两句放在一起解析，简单来说，`methods` 能访问所有字段。

```ts
declare function SimpleVue<TData, TComputed, TMethods>(options: {
  data: (this: void) => TData;
  computed: TComputed & ThisType<TData>;
  methods: TMethods & ThisType<TData & TComputed & TMethods>;
}): any;
```

这个时候会发现测试用例中有两处报错，都是因为 `this.fullname` 导致的，因为目前 `this.fullname` 是函数类型，而题目要求了 `computed` 在上下文中应暴露计算出的值而不是函数。

所以我们需要将 `computed` 对象中每个函数的返回值组成一个新的类型返回，我们叫它 `GetComputed`。

```ts
type GetComputed<T> = {
  [P in keyof T]: T[P] extends (...args: any) => infer R ? R : never;
};
```

Computed 的实现就比较简单了，遍历 `computed` 中的 `key`，使用 `extends` 关键字看是不是函数类型，使用 `infer` 关键字得到返回值类型。

### 最终实现

所以这道题的最终实现为：

```ts
type GetComputed<T> = {
  [P in keyof T]: T[P] extends (...args: any) => infer R ? R : never;
};

declare function SimpleVue<TData, TComputed, TMethods>(options: {
  data: (this: void) => TData;
  computed: TComputed & ThisType<TData>;
  methods: TMethods & ThisType<TData & GetComputed<TComputed> & TMethods>;
}): any;
```

## 参考链接

- [ThisType](https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype)
- [条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [infer](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
