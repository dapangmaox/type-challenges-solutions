// ============= Test Cases =============
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>
];
// ============= Your Code Here =============
type Pop<T extends any[]> = T extends [...infer R, any] ? R : T;
type Shift<T extends any[]> = T extends [any, ...infer R] ? R : T;
type Push<T extends any[], V> = [...T, V];
type Unshift<T extends any[], V> = [V, ...T];
