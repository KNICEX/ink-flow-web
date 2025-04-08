type offsetLoadFunc = (offset: number) => Promise<number | undefined>
type maxIdLoadFunc = (maxId: number) => Promise<number | undefined>
type maxIdTimestampLoadFunc = (
  maxId: number,
  timestamp: number,
) => Promise<{ maxId: number; timestamp: Date } | undefined>

interface WrappedFunc {
  loadMore: () => void
  reset: () => void
}

export const wrapOffsetPagedFunc = (loadFunc: offsetLoadFunc, limit: number) => {
  let offset = 0
  let loading = false
  let noMore = false
  return {
    loadMore: async () => {
      if (loading) return
      if (noMore) return
      loading = true
      const n = await loadFunc(offset)
      if (n === undefined) {
        // 不需要实际请求，可能是限流或者其他原因
        loading = false
        return true
      }

      offset += n
      loading = false
      if (n < limit) {
        noMore = true
      }
      return !noMore // false if no more data
    },
    reset: () => {
      offset = 0
      noMore = false
      loading = false
    },
  }
}

export const wrapMaxIdPagedFunc = (loadFunc: maxIdLoadFunc) => {
  let maxId = 0
  let loading = false
  let noMore = false
  return {
    loadMore: async () => {
      if (loading) return
      if (noMore) return
      loading = true
      const resMaxId = await loadFunc(maxId)
      if (resMaxId === undefined) {
        // 不需要实际请求，可能是限流或者其他原因
        loading = false
        return true
      }

      if (resMaxId == 0) {
        loading = false
        noMore = true
        return false // no more data
      }
      maxId = resMaxId
      loading = false
      return !noMore // false if no more data
    },
    reset: () => {
      maxId = 0
      noMore = false
      loading = false
    },
  }
}

export const wrapMaxIdTimestampPagedFunc = (loadFunc: maxIdTimestampLoadFunc) => {
  let maxId = 0
  let timestamp = new Date()
  let loading = false
  let noMore = false
  return {
    loadMore: async () => {
      if (loading) return
      if (noMore) return
      loading = true
      const resMaxIdTimestamp = await loadFunc(maxId, timestamp.getTime())
      if (resMaxIdTimestamp === undefined) {
        // 不需要实际请求，可能是限流或者其他原因
        loading = false
        return true
      }

      if (resMaxIdTimestamp.maxId == 0) {
        loading = false
        noMore = true
        return false // no more data
      }
      maxId = resMaxIdTimestamp.maxId
      timestamp = new Date(resMaxIdTimestamp.timestamp)
      loading = false
      return !noMore // false if no more data
    },
    reset: () => {
      maxId = 0
      timestamp = new Date()
      noMore = false
      loading = false
    },
  }
}
