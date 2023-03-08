import { type Routes } from './types'

export const generateRoutes = <T>(routes: T): Routes<T> => {
  const f = (
    object: any,
    paths: string[] = [],
    names: string[] = []
  ): Routes<T> => {
    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => {
        if (value instanceof Object) {
          return [
            key,
            f(object[key], [...paths, object[key].index], [...names, key])
          ]
        } else {
          const path = [...paths, key === 'index' ? '' : object[key]].join('')
          const name = [...names, key].join('.')
          return [
            key,
            {
              path,
              name
            }
          ]
        }
      })
    )
  }

  return f(routes)
}
