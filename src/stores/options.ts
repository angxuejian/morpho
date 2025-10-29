import { defineStore } from 'pinia'
import { getCache, setCache } from '@/utils/catch'


export const useOptionsStore = defineStore('options', () => {
  const prefix = 'morpho_'
  const intervalMs = 5 * 60 * 1000 // 5分钟

  const getOptions = async (key: string) => {

    const cacheKey = prefix + key
    const cached = getCache(cacheKey)

    if (cached) {
      return cached
    }

    const result = await fetch(key)
    const data = await result.json()

    setCache(cacheKey, data, intervalMs)

    return data
  }

  return { getOptions }
})
