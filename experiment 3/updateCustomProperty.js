//mengambil properti khusus (tidak terlalu fungsinya karena mengambil dari youtube)
export function getCustomProperty(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

//mengatur properti khusus (tidak terlalu fungsinya karena mengambil dari youtube)
export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value)
}

//meningkatkan properti khusus (tidak terlalu fungsinya karena mengambil dari youtube)
export function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
}
