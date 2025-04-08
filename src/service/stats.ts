import { get } from './axios.ts'
import type { TagStats } from '../types/tag.ts'
export const topTag = (offset: number, limit: number) => {
  return get<TagStats>('/stats/top-tag', {
    params: {
      offset,
      limit,
    },
  })
}
