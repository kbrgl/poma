// Pad zeroes for formatting time so 6m5s shows up as 6:05 rather than 6:5
const padTimeZeroes = t => (t % 60 < 10 ? "0" : "") + t % 60

// Format given number of ms as minutes:seconds
export const formatMS = ms => {
  let time = Math.ceil(ms / 1000)
  time = padTimeZeroes(Math.trunc(time / 60)) + ":" + padTimeZeroes(time)
  return time
}

// Time units to standard milliseconds
export const milliseconds = n => n
export const seconds = n => n * milliseconds(1000)
export const minutes = n => n * seconds(60)
export const hours = n => n * minutes(60)
