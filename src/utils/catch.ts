export function setCache(key: string, data: any, ttl?: number) {
  const now = Date.now()
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      expire: ttl ? now + ttl : null
    })
  )
}

export function getCache(key: string) {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (parsed.expire && parsed.expire < Date.now()) {
      localStorage.removeItem(key)
      return null
    }
    return parsed.data
  } catch {
    return null
  }
}
