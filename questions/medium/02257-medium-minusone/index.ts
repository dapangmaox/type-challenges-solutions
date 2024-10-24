// ============= Test Cases =============
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>
];
// ============= Your Code Here =============
type Pop<T extends any[]> = T extends [...infer head, any] ? head : never;

type MinusOne<T extends number, A extends any[] = []> = A['length'] extends T
  ? Pop<A>['length']
  : MinusOne<T, [...A, 0]>;
