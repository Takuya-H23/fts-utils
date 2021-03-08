/**
 * Run predicate functions. Returns true when every predicate evaluates true.
 * Otherwise returns false
 *
 * @param run - predicate function
 *
 * @public
 */

type Run = (x: any) => boolean
type Contramap = (x: any) => any
type Predicate = {
  run: Run
  concat: (other: Predicate) => Predicate
  contramap: (f: Contramap) => Predicate
}

export default function Predicate(run: Run): Predicate {
  return {
    run,
    concat: (other: Predicate) => Predicate(x => run(x) && other.run(x)),
    contramap: (f: any) => Predicate(x => run(f(x))),
  }
}
