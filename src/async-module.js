function getValue() {
  import('lodash').then(({ default: _ }) => {
    return _.join(['11', '22', '33'], '-')
  })
}

getValue.then(res => {
  console.log(res)
})