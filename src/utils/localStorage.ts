import { LocalStorageItem } from '../types/localStorage'

export const setLocalStorageItem = (
  item: LocalStorageItem,
  value: any,
  config: {
    isObject?: boolean
  }
) => {
  const { isObject } = config ?? {}
  let itemValue = value

  if (isObject) {
    itemValue = JSON.stringify(value)
  }

  window.sessionStorage.setItem(item, itemValue)
}

export const getLocalStorageItem = (
  item: LocalStorageItem,
  config: {
    isNumber?: boolean
    isObject?: boolean
  }
): any => {
  const { isNumber, isObject } = config ?? {}
  const itemFound: string | null = window.sessionStorage.getItem(item)

  if (!itemFound) return null

  if (isNumber) {
    return parseInt(itemFound)
  }

  if (isObject) {
    return JSON.parse(itemFound)
  }

  return itemFound
}

export const clearLocalStorageItem = (item: LocalStorageItem) => {
  window.sessionStorage.removeItem(item)
}
