export default {
  filters: {
    shorten (val, restrictToLen) {
      // console.log({ shorten: { val, restrictToLen } })

      let len = val.length

      if (len <= restrictToLen) {
        return val
      }
      else {
        return val.substring(0, restrictToLen) + '...'
      }
    }
  }
}
