type offsetLoadFunc = (offset: number) => Promise<number | undefined>
type maxIdLoadFunc = (maxId: number) => Promise<number | undefined>

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
