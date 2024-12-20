---
title: Objectentries
---

## 挑战

Implement the type version of `Object.entries`

For example

```typescript
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model>; // ['name', string] | ['age', number] | ['locations', string[] | null];
```

## 解答

[答案](https://github.com/type-challenges/type-challenges/issues/14052)
