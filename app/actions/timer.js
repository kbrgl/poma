import {
  TIMER_TICK,
  TIMER_START,
  TIMER_PAUSE,
  TIMER_COMPLETE,
  TIMER_RESET
} from "../constants/timer"

export const tick = time => ({
  type: TIMER_TICK,
  time
})

export const start = () => ({
  type: TIMER_START
})

export const pause = () => ({
  type: TIMER_PAUSE
})

export const complete = overflow => ({
  type: TIMER_COMPLETE,
  overflow
})

export const reset = () => ({
  type: TIMER_RESET
})
