import type { Ink } from '@/types/ink.ts'
import { emptyInk, InkStatus } from '@/types/ink.ts'
import type { User } from '@/types/user.ts'
import { emptyUser } from '@/types/user.ts'

export const demoInks = (n?: number) => {
  const res: Ink[] = []
  n = n == undefined ? 20 : n
  for (let i = 0; i < n; i++) {
    const ink = emptyInk()
    ink.id = i
    ink.cover =
      Math.random() > 0.3
        ? 'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1741972492/twitter_%E3%81%A4%E3%82%86%E3%81%BF%E3%81%8B%E3%82%93_mikansui_mi__20240830-151114_1829537369512685968_photo_n2pcjg.jpg'
        : ''
    ink.contentHtml = 'Hello this'
    ink.title = 'testInk'
    ink.tags = ['test', 'test2']
    ink.status = InkStatus.Published
    ink.author.avatar =
      'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1741972579/twitter_snowmint_snowlistenz__20241003-030616_1841676112663114079_photo_rii427.jpg'
    ink.author.username = 'Mikan'
    ink.author.account = 'mikan'
    ink.author.aboutMe = 'I am a cat'
    ink.author.followers = 100
    ink.author.following = 100
    ink.interactive.viewCnt = 100
    ink.interactive.likeCnt = 100
    ink.interactive.commentCnt = 100

    res.push(ink)
  }
  return res
}

export const demoUsers = () => {
  const res: User[] = []
  for (let i = 0; i < 20; i++) {
    const user = emptyUser()
    user.id = i
    user.avatar =
      'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1741972579/twitter_snowmint_snowlistenz__20241003-030616_1841676112663114079_photo_rii427.jpg'
    user.banner =
      'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1741972579/twitter_snowmint_snowlistenz__20241003-030616_1841676112663114079_photo_rii427.jpg'
    user.username = 'Mikan'
    user.account = 'mikan'
    user.aboutMe = 'I am a cat'
    user.email = ''
    user.phone = ''
    user.followed = i % 2 === 0
    user.followers = 100
    user.following = 100
    user.createdAt = new Date()
    user.updatedAt = new Date()
    res.push(user)
  }
  return res
}
