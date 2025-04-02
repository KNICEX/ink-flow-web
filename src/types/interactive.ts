export interface Favorite {
  id: number
  biz: string
  name: string
  private: boolean
  createdAt: Date
}

export const emptyFavorite = (): Favorite => {
  return {
    id: 0,
    biz: '',
    name: '',
    private: false,
    createdAt: new Date(),
  }
}
