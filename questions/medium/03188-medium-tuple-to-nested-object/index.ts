// ============= Test Cases =============
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<
    Equal<
      TupleToNestedObject<['a', 'b', 'c'], boolean>,
      { a: { b: { c: boolean } } }
    >
  >,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];
// ============= Your Code Here =============
type TupleToNestedObject<T, U> = T extends [infer First, ...infer Rest]
  ? { [K in First & PropertyKey]: TupleToNestedObject<Rest, U> }
  : U;
