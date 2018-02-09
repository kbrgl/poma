import { TICK, START, PAUSE, COMPLETE, RESET } from "../constants/timer"

export const tick = time => ({
  type: TICK,
  time
})

export const start = () => ({
  type: START
})

export const pause = () => ({
  type: PAUSE
})

export const complete = overflow => ({
  type: COMPLETE,
  overflow
})

export const reset = () => ({
  type: RESET
})
