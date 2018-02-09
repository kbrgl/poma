// @flow

// Pad zeroes for formatting time so 6m5s shows up as 6:05 rather than 6:5
const padTimeZeroes = t => (t % 60 < 10 ? "0" : "") + t % 60

// Format given number of ms as minutes:seconds
export const formatMS = (ms: number) => {
  let time = Math.ceil(ms / 1000)
  time = `${padTimeZeroes(Math.trunc(time / 60))}:${padTimeZeroes(time)}`
  return time
}

// Time units to standard milliseconds
export const milliseconds = (n: number) => n
export const seconds = (n: number) => n * milliseconds(1000)
export const minutes = (n: number) => n * seconds(60)
export const hours = (n: number) => n * minutes(60)
