// ============= Test Cases =============
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
];
// ============= Your Code Here =============
type Space = ' ' | `\n` | `\t`;
type Trim<S extends string> = S extends
  | `${Space}${infer Rest}`
  | `${infer Rest}${Space}`
  ? Trim<Rest>
  : S;
