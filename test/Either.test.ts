import { Either } from '../src'

const add1 = (x: number) => x + 1
const left = (_x: any) => 'left'
const right = (_x: any) => 'right'
const id = (x: any) => x

const leftChain = (x: any) => Either.Right(x)
const rightChain = (x: any) => Either.Right(x)

describe('Left', () => {
  const either = Either.Left(0)

  test('should return status', () => {
    expect(either).toHaveProperty('isLeft', true)
    expect(either).toHaveProperty('isRight', false)
  })

  test('should take LeftFold', () => {
    expect(either.fold(left, id)).toBe('left')
  })

  test('should return Left', () => {
    expect(either.map(add1).fold(id, id)).toBe(0)
    expect(either.chain(leftChain).isLeft).toBe(true)
    expect(either.map(add1).chain(leftChain).map(add1).fold(id, id)).toBe(0)
  })
})

describe('Right', () => {
  const either = Either.Right(0)

  test('should return status', () => {
    expect(either).toHaveProperty('isLeft', false)
    expect(either).toHaveProperty('isRight', true)
  })

  test('should take RightFold', () => {
    expect(either.fold(left, right)).toBe('right')
  })

  test('should return Right', () => {
    expect(either.map(add1).isRight).toBe(true)
  })

  test('chain should return without Right', () => {
    expect(either.chain(add1)).toBe(1)
    expect(either.map(add1).chain(rightChain).map(add1).fold(id, id)).toBe(2)
  })
})

describe('fromNullable', () => {
  test.each([[undefined], [null]])('should return left', (x) => {
    expect(Either.fromNullable(x).isLeft).toBe(true)
  })

  test.each([[1], ['hi']])('should return left', (x) => {
    expect(Either.fromNullable(x).isRight).toBe(true)
  })
})
