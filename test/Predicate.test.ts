import { Predicate } from '../src'

const isNumber = (x: number) => typeof x === 'number'
const isEven = (x: number) => x % 2 === 0
const isTen = (x: number) => x === 10

describe('Run', () => {
  test.each([
    [null, false],
    [3, true],
  ])('should invoke the predicate function', (arg, res) => {
    expect(Predicate(isNumber).run(arg)).toBe(res)
  })
})

describe('Concat', () => {
  test('should concat Predicates and return false', () => {
    const res = Predicate(isNumber).concat(Predicate(isEven)).run(7)
    expect(res).toBe(false)
  })

  test('should concat Predicates and return true', () => {
    const f = Predicate(isNumber)
      .concat(Predicate(isEven))
      .concat(Predicate(x => x === 24))

    expect(f.run(24)).toBe(true)
  })
})

describe('Contramap', () => {
  test('should contramap then return false', () => {
    const res = Predicate(isNumber)
      .contramap((x: any) => x.value)
      .run({ value: 'foo' })
    expect(res).toBe(false)
  })

  test('should contramap then return true', () => {
    const res = Predicate(isNumber)
      .contramap((x: any) => x.value)
      .run({ value: 5 })
    expect(res).toBe(true)
  })
})

describe('Predicate', () => {
  const checkNum = Predicate(({ product }) => product === 'banana')
    .concat(Predicate(isEven).contramap(({ value }: any) => value))
    .concat(Predicate(isTen).contramap(({ value }: any) => value / 10))

  test('should return false as Predicate', () => {
    expect(checkNum.run({ value: 101, product: 'banana' })).toBe(false)
  })

  test('should return true as Predicate', () => {
    expect(checkNum.run({ value: 100, product: 'banana' })).toBe(true)
  })
})
