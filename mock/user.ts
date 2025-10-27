import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
  {
    url: '/api/users',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: Mock.mock({
          'list|5-10': [
            {
              'id|+1': 1,
              name: '@cname',
              'age|18-40': 1,
              email: '@email'
            }
          ]
        }).list
      }
    }
  }
] as MockMethod[]
