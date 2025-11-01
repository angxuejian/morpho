import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
const categories1 = ['电子产品', '家用电器', '服装鞋帽', '食品饮料', '家具家居', '运动户外']
const categories2 = [
  '手机',
  '电脑',
  '电视',
  '厨房电器',
  '男装',
  '女装',
  '零食',
  '饮品',
  '沙发',
  '桌椅',
  '运动器材'
]
const categories3 = ['高端系列', '经济款', '新品推荐', '畅销款', '折扣专区', '配件', '限量版']

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
  },
  {
    url: '/api/countries',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          list: Mock.mock({
            'list|5-10': [
              {
                'code|+1': 1,
                name: '@ctitle(2, 4)国'
              }
            ]
          }).list
        }
      }
    }
  },
  {
    url: '/api/categories',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          categories: Mock.mock({
            'list|5-10': [
              {
                'id|+1': 1,
                name: () => Mock.Random.pick(categories1),
                'sub|2-4': [
                  {
                    'id|+11': 11,
                    name: () => Mock.Random.pick(categories2),
                    'sub|1-3': [
                      {
                        'id|+111': 111,
                        name: () => Mock.Random.pick(categories3)
                      }
                    ]
                  }
                ]
              }
            ]
          }).list
        }
      }
    }
  }
] as MockMethod[]
