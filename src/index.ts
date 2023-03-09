import { type Routes } from './types'

interface StringObject {
  index?: string
  [key: string]: string | StringObject | undefined
}

export const generateRoutes = <T>(routes: T): Routes<T> => {
  const f = (
    object: StringObject,
    paths: string[] = [],
    names: string[] = []
  ): Routes<T> => {
    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => {
        if (value instanceof Object) {
          return [
            key,
            f(object[key] as StringObject, [...paths, (object[key] as StringObject).index as string], [...names, key])
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

  return f(routes as StringObject)
}
