import { describe, expect, test } from 'vitest'
import { generateRoutes } from './index'

describe('test generateRoutes', () => {
  test('basic usage', () => {
    const routes = {
      home: '/',
      about: '/about',
      user: {
        index: '/user',
        edit: '/edit'
      }
    }

    const expected = {
      home: {
        name: 'home',
        path: '/'
      },
      about: {
        name: 'about',
        path: '/about'
      },
      user: {
        index: {
          name: 'user.index',
          path: '/user'
        },
        edit: {
          name: 'user.edit',
          path: '/user/edit'
        }
      }
    }

    const result = generateRoutes(routes)
    expect(result).toEqual(expected)
  })

  test('with params', () => {
    const routes = {
      home: '/',
      about: '/about',
      user: {
        index: '/user',
        edit: '/edit/:id'
      }
    }

    const expected = {
      home: {
        name: 'home',
        path: '/'
      },
      about: {
        name: 'about',
        path: '/about'
      },
      user: {
        index: {
          name: 'user.index',
          path: '/user'
        },
        edit: {
          name: 'user.edit',
          path: '/user/edit/:id'
        }
      }
    }

    const result = generateRoutes(routes)
    expect(result).toEqual(expected)
  })
})
