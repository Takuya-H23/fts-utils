/**
 * Run predicate functions. Returns true when every predicate evaluates true.
 * Otherwise returns false
 *
 * @param run - predicate function
 *
 * @public
 */

type Predicate = {
  run: Run
  concat: (other: Predicate) => Predicate
}

type Run = (x: any) => boolean

export default function Predicate(run: Run) {
  return {
    run,
    concat: (other: Predicate) => Predicate(x => run(x) && other.run(x)),
    contramap: (f: any) => Predicate(x => run(f(x))),
  }
}
