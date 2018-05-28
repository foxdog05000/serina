'use strict';

module.exports = {
  isDefined: (value) => {
    return value !== undefined && value !== null
  },

  isObject: (value) => {
    return typeof value === 'object'
  },

  isArray: (val) => {
    return Object.prototype.toString.call(val) === '[object Array]'
  },

  isPlainObject: (val) => {
    return Object.prototype.toString.call(val) === '[object Object]'
  },

  sortJSON: (json) => {
    try {
      let r = this.sortAsc(json)
      return JSON.parse(JSON.stringify(r, null, 4))
    } catch (ex) {
      console.log('Incorrect JSON object')
      return json
    }
  },

  sortAsc: (un) => {
    let or = {}
    if (this.isArray(un)) {
      or = un.sortAsc()
      or.forEach((v, i) => {
        or[i] = this.sortAsc(v)
      })
    } else if (this.isPlainObject(un)) {
      or = {}
      Object.keys(un).sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) { return -1 }
        if (a.toLowerCase() > b.toLowerCase()) { return 1 }
        return 0
      }).forEach((key) => {
        or[key] = this.sortJSON(un[key])
      })
    } else {
      or = un
    }
    return or
  }

}
