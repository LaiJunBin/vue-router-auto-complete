# vue-router-auto-complete

> This package is used for typescript development.

The package implements routes syntax auto completed and children routes prefix.

---

## Install
```
$ npm i vue-router-auto-complete
```

## Basic usage

```ts
import { generateRoutes } from 'vue-router-auto-complete'

const routes = {
  home: '/',
  dashboard: {
    index: '/dashboard',
    tabs: {
      tab1: '/tab1',
      tab2: '/tab2'
    }
  }
}

export default generateRoutes<typeof routes>(routes)
```

will generate the following object.

```json
{
    "home": {
        "path": "/",
        "name": "home"
    },
    "dashboard": {
        "index": {
            "path": "/dashboard",
            "name": "dashboard.index"
        },
        "tabs": {
            "tab1": {
                "path": "/dashboard/tab1",
                "name": "dashboard.tabs.tab1"
            },
            "tab2": {
                "path": "/dashboard/tab2",
                "name": "dashboard.tabs.tab2"
            }
        }
    }
}
```

at the same time, will also syntax auto complete.

![](./docs/images/auto-complete.gif)


The router definition is also simpler.
```ts
import routes from '@/const/routes'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...routes.home,
      component: HomeView
    },
    {
      ...routes.dashboard.index,
      children: [
        {
          ...routes.dashboard.tabs.tab1,
          component: () => import('@/views/dashboard/tabs/Tab1View.vue')
        },
        {
          ...routes.dashboard.tabs.tab2,
          component: () => import('@/views/dashboard/tabs/Tab2View.vue')
        }
      ]
    }
  ]
})

export default router
```

RouterLink is also.
```html
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import routes from './const/routes'
</script>

<template>
  <RouterLink :to="routes.home.path">Home</RouterLink>
  <RouterLink :to="routes.dashboard.tabs.tab1.path">tab 1</RouterLink>
  <RouterLink :to="routes.dashboard.tabs.tab2.path">tab 2</RouterLink>
  <hr />
  <RouterView />
</template>
```

---

## Usage with params

Same as the original vue-router definition.

```ts
import { generateRoutes } from 'vue-router-auto-complete'

const routes = {
  home: '/',
  page: '/page/:page',
}

export default generateRoutes<typeof routes>(routes)
```

It will generate:
```json
{
    "home": {
        "path": "/",
        "name": "home"
    },
    "page": {
        "path": "/page/:page",
        "name": "page"
    }
}
```

RouterLink example:
```html
<RouterLink :to="{ ...routes.page, params: { page: 'hello' } }">Hello Page</RouterLink>
```

Will link to `/page/hello`.
