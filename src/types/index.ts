export type ReplaceDeep<T, A, B> = {
  [K in keyof T]: T[K] extends A
    ? B
    : T[K] extends object
      ? ReplaceDeep<T[K], A, B>
      : T[K]
}

export interface RouteValue {
  path: string
  name: string
}

export type Routes<T> = ReplaceDeep<T, string, RouteValue>
