import type { Ink } from '@/types/ink.ts'
import { emptyInk, InkStatus } from '@/types/ink.ts'
import type { User } from '@/types/user.ts'
import { emptyUser } from '@/types/user.ts'

const randomCover = () => {
  const urls = [
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1742147867/qzr5v0bavnefmijyjhzd.jpg',
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1742200924/nchghsqliegrlcqmuqd1.jpg',
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1742156516/iedbssljjhobe5oltyrd.jpg',
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1742145347/j1ozvllqd0xe7dtw2x7c.png',
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1741972579/twitter_snowmint_snowlistenz__20241003-030616_1841676112663114079_photo_rii427.jpg',
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1741537291/twitter_%E8%B0%B7%E5%B7%9D_kibishiihiekomi__20250204-093016_1886708845923459466_photo_dntbvf.jpg',
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1741704737/twitter_%E5%91%BD_atmarkaoi__20230511-085828_1656584545968484354_photo-3_mzi7ql.jpg',
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1742146011/pmbdmoo0dwf25wetphkl.jpg',
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1742148009/fdhqgjp7djhdyuzmps18.jpg',
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1742156721/cb9h1ixah2vgd3ytydax.jpg',
    'https://res.cloudinary.com/dw3cnfcb5/image/upload/v1742150049/rxzafga7q1rx1y6cqdjp.jpg',
  ]
  if (Math.random() < 0.1) {
    return ''
  }
  return urls[Math.floor(Math.random() * urls.length)]
}

const randomTitle = () => {
  const titles = [
    'Hello this is a title',
    'This is a title',
    'This is a very very very long long long title',
    'Today is a good day',
    'What is web3',
    'What is blockchain',
    'What is NFT',
    'about the golang',
    'about the long long long long rust',
    'about the vue',
    'how to draw a cat',
    'how to draw a dog',
    'how to draw a bird',
  ]
  return titles[Math.floor(Math.random() * titles.length)]
}

const randomAccount = () => {
  const accounts = [
    'mikan',
    'cat',
    'misaki',
    'chtholly',
    'nephren',
    'willem',
    'ren',
    'kutori',
    'kazuki',
    'chise',
    'elias',
    'satoshi',
  ]
  return accounts[Math.floor(Math.random() * accounts.length)]
}

export const demoInks = (n?: number) => {
  const res: Ink[] = []
  n = n == undefined ? 20 : n
  for (let i = 0; i < n; i++) {
    const ink = emptyInk()
    ink.id = i
    ink.cover = randomCover()
    ink.contentHtml = 'Hello this'
    ink.title = randomTitle()
    ink.tags = ['test', 'test2']
    ink.status = InkStatus.Published
    ink.author.avatar = randomCover()
    ink.author.username = 'Mikan'
    ink.author.account = randomAccount()
    ink.author.aboutMe = 'I am a cat'
    ink.author.followers = Math.floor(Math.random() * 1000)
    ink.author.following = Math.floor(Math.random() * 1000)
    ink.interactive.viewCnt = Math.floor(Math.random() * 1000)
    ink.interactive.collectCnt = Math.floor(Math.random() * 1000)
    ink.interactive.likeCnt = Math.floor(Math.random() * 1000)
    ink.interactive.commentCnt = Math.floor(Math.random() * 1000)

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
