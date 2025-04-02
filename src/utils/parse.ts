import type { LocationQueryValue } from 'vue-router'

export const parseRouteParam = (param: string | string[] | undefined) => {
  if (param == undefined) {
    return ''
  }
  if (typeof param === 'string') {
    return param
  } else if (param.length === 0) {
    return ''
  }
  return param[0]
}

export const parseRouteParamToInt = (param: string | string[] | undefined) => {
  if (param == undefined) {
    return 0
  }
  if (typeof param === 'string') {
    return parseInt(param == '' ? '0' : param)
  } else if (param.length === 0) {
    return 0
  }
  return parseInt(param[0] == '' ? '0' : param[0])
}

export const parseRouteQuery = (query: LocationQueryValue | LocationQueryValue[]): string => {
  if (query == undefined) {
    return ''
  }
  if (typeof query === 'string') {
    return query
  }
  return query[0] ?? ''
}

export const parseResponseDate = (data: any) => {
  if (!data) {
    return
  }
  if (Array.isArray(data)) {
    for (const item of data) {
      parseResponseDate(item)
    }
  } else if (typeof data == 'object') {
    // 检查属性
    for (const key in data) {
      if (typeof data[key] == 'object') {
        parseResponseDate(data[key])
      }
    }

    if (data.createdAt) {
      data.createdAt = new Date(data.createdAt)
    }
    if (data.updatedAt) {
      data.updatedAt = new Date(data.updatedAt)
    }
  }
}
