// src/mockProdServer.ts
import { createProdMockServer } from 'vite-plugin-mock/client'
import type { MockMethod } from 'vite-plugin-mock'


export function setupProdMockServer() {
  // 自动导入所有 mock 文件
  const modules = import.meta.glob('../mock/**/*.ts', { eager: true })
  const mockList: any[] = []

  Object.keys(modules).forEach((key) => {
    const mod: any = modules[key]
    if (mod.default) {
      mockList.push(...mod.default)
    }
  })

  console.log('[mockProdServer] Loaded mock files:', mockList)

  // 默认支持 XMLHttpRequest 请求拦截
  createProdMockServer(mockList)

  // 支持 fetch 请求拦截
  createProdMockServerFetch(mockList)
}


const getFetchUrl = (input: RequestInfo | URL): string => {
  if (typeof input === 'string') {
    return input
  }

  if (input instanceof URL) {
    return input.toString()
  }

  // Request 对象
  if (input instanceof Request) {
    return input.url
  }

  // 理论不会走到这里，但保险起见
  return String(input)
}


const createProdMockServerFetch = (mockList: MockMethod[]) => {
  const originalFetch = window.fetch.bind(window)
  const urlList = mockList.map((item: MockMethod) => item.url)

  window.fetch = async (url: RequestInfo | URL, options?: RequestInit) => {

    // ✅ 支持相对路径的匹配
    const path = getFetchUrl(url)
    const isMockUrl = urlList.includes(path)

    if (isMockUrl) {
      console.log('[fetch mock] intercepted:', path)

      const mockResponse = mockList.find((item: MockMethod) => item.url === path)?.response()

      const headers = new Headers({ 'Content-Type': 'application/json' })
      const response = new Response(JSON.stringify(mockResponse), {
        headers,
        status: 200,
        statusText: 'OK',
      })

      return response
    }

    // ⚠️ 不匹配 mock 路径，走原始 fetch
    return originalFetch(url, options)
  }
}
