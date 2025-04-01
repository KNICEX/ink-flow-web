export const formatDate = (date: Date, detail?: boolean) => {
  // 1小时内
  if (date.getTime() > Date.now() - 1000 * 60 * 60) {
    // xx分钟前
    const diff = Math.floor((Date.now() - date.getTime()) / 1000)
    if (diff < 60) {
      return `${diff}秒前`
    }
    if (diff < 3600) {
      return `${Math.floor(diff / 60)}分钟前`
    }
  }

  // 一天内
  if (date.getTime() > Date.now() - 1000 * 60 * 60 * 24) {
    // xx小时前
    return `${Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))}小时前`
  }

  // xxxx年xx月xx日
  if (detail) {
    // 带日期，
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}
