type FoldLeft = (x: any) => any
type FoldRight = (x: any) => any

type MapLeft = (x: any) => any
type ChainLeft = (x: any) => Left

type MapRight = (x: any) => any
type ChainRight = (x: any) => any

type Left = {
  isLeft: boolean
  isRight: boolean
  x: any
  map: (f: MapLeft) => Left
  chain: (f: MapLeft) => Left
  fold: (f: FoldLeft, g: FoldRight) => any
}

type Right = {
  x: any
  isLeft: boolean
  isRight: boolean
  map: (f: MapRight) => Right
  chain: (f: MapRight) => any
  fold: (f: FoldLeft, g: FoldRight) => any
}

function Left(x: any): Left {
  return {
    x,
    isLeft: true,
    isRight: false,
    map: (_f: MapLeft) => Left(x),
    chain: (_f: ChainLeft) => Left(x),
    fold: (f: FoldLeft, _g: FoldRight) => f(x),
  }
}

function Right(x: any): Right {
  return {
    x,
    isLeft: false,
    isRight: true,
    map: (f: MapRight) => Right(f(x)),
    chain: (f: ChainRight) => f(x),
    fold: (_f: FoldLeft, g: FoldRight) => g(x),
  }
}

function fromNullable(x: any): Right | Left {
  return x == null ? Left(x) : Right(x)
}

export default { Left, Right, fromNullable }
