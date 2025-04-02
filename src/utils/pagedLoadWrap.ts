type offsetLoadFunc = (offset: number) => Promise<number>
type maxIdLoadFunc = (maxId: number) => Promise<number>

interface WrappedFunc {
  loadMore: () => void
  reset: () => void
}

export const wrapOffsetPagedFunc = (loadFunc: offsetLoadFunc, limit: number) => {
  let offset = 0
  let loading = false
  return {
    loadMore: async () => {
      if (loading) return
      loading = true
      const n = await loadFunc(offset)
      offset += n
      loading = false
      return n == limit // false if no more data
    },
    reset: () => {
      offset = 0
      loading = false
    },
  }
}

export const wrapMaxIdPagedFunc = (loadFunc: maxIdLoadFunc) => {
  let maxId = 0
  let loading = false
  return {
    loadMore: async () => {
      if (loading) return
      loading = true
      const resMaxId = await loadFunc(maxId)
      if (resMaxId == 0) {
        loading = false
        return false // no more data
      }
      maxId = resMaxId
      loading = false
      return // false if no more data
    },
    reset: () => {
      maxId = 0
      loading = false
    },
  }
}
