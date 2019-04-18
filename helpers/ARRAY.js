export const INTERSECTION = ({ arrOfArr }) => {
  return arrOfArr.reduce((a, b) => a.filter(c => b.includes(c)))
}

export const SORT_ARR_OF_OBJ = ({ arr, key, order = 'DESC', dataType = 'string' }) => {

  function compare(a, b) {
    if (dataType === 'string') {
      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        if (order === 'DESC')
          return 1
        else if (order === 'ASC')
          return -1
      }
      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        if (order === 'DESC')
          return -1
        else if (order === 'ASC')
          return 1
      }
      return 0;
    }
    else if (dataType === 'float') {
      if (parseFloat(a[key]) < parseFloat(b[key])) {
        if (order === 'DESC')
          return 1
        else if (order === 'ASC')
          return -1
      }
      if (parseFloat(a[key]) > parseFloat(b[key])) {
        if (order === 'DESC')
          return -1
        else if (order === 'ASC')
          return 1
      }
      return 0;
    }
  }

  return arr.sort(compare);
}
