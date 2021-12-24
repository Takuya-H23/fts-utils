export type Run = (x: any) => boolean
export type Contramap = (x: any) => any
export type PredicateType = {
  run: Run
  concat: (other: PredicateType) => PredicateType
  contramap: (f: Contramap) => PredicateType
}

export type FoldLeftType = (x: any) => any
export type FoldRightType = (x: any) => any

export type MapLeftType = (x: any) => any
export type ChainLeftType = (x: any) => LeftType

export type MapRightType = (x: any) => any
export type ChainRightType = (x: any) => any

export type LeftType = {
  isLeft: boolean
  isRight: boolean
  x: any
  map: (f: MapLeftType) => LeftType
  chain: (f: MapLeftType) => LeftType
  fold: (f: FoldLeftType, g: FoldRightType) => any
}

export type RightType = {
  x: any
  isLeft: boolean
  isRight: boolean
  map: (f: MapRightType) => RightType
  chain: (f: MapRightType) => any
  fold: (f: FoldLeftType, g: FoldRightType) => any
}
