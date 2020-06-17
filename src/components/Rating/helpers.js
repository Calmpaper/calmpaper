export function median(arr) {
  arr.sort(function (a, b) {
    return a - b
  })
  var i = arr.length / 2
  return i % 1 == 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)]
}

export function round(value, step) {
  step || (step = 1.0)
  var inv = 1.0 / step
  return Math.round(value * inv) / inv
}
