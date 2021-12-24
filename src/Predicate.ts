/**
 * Run predicate functions. Returns true when every predicate evaluates true.
 * Otherwise returns false
 * @func
 * @public
 * @example
 *
 * Predicate((x => x === 1)).run(1) // true
 * Predicate((x => x === 1)).run(2) // false
 * Predicate((x => x === 1))
 *  .concat(Predicate(x => typeof x === 'number')).run(1) // true
 * Predicate(isNumber).contramap(x => x.value).run({ value: 2 }) // true
 */

export type Run = (x: any) => boolean
export type Contramap = (x: any) => any
export type Predicate = {
  run: Run
  concat: (other: Predicate) => Predicate
  contramap: (f: Contramap) => Predicate
}

export default function Predicate(run: Run): Predicate {
  return {
    run,
    concat: (other: Predicate): Predicate =>
      Predicate((x: any) => run(x) && other.run(x)),
    contramap: (f: any): Predicate => Predicate((x: any) => run(f(x))),
  }
}
