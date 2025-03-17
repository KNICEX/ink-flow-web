export const formatDate = (date: Date) => {
  // xxxx年xx月xx日
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}
