import * as time from "../utils/time"
import { complete } from "../actions/timer"
import {
  WORK,
  LONG_BREAK,
  BREAK,
  TIMER_START,
  TIMER_PAUSE,
  TIMER_RESET,
  TIMER_COMPLETE,
  TIMER_TICK
} from "../constants/timer"

const initialState = {
  // type of cycle
  type: WORK,
  // duration of different cycle types
  times: {
    work: time.minutes(25),
    shortBreak: time.minutes(5),
    longBreak: time.minutes(30)
  },
  // whether the timer has been started
  started: false,
  // whether the timer is currently ticking
  active: false,
  // number of pomodoros (work cycles) completed
  count: 0
}
initialState.time = initialState.times.work

const timer = (state = initialState, action) => {
  switch (action.type) {
    // tick of the internal timer, not managed by the reducer
    case TIMER_TICK:
      // The component managing the timer passes the new time to the reducer
      // which updates the state.
      // The new time is passed to the component through its props, and at
      // the next tick of the timer, the process repeats.
      return {
        ...state,
        time: action.time
      }
    case TIMER_START:
      return {
        ...state,
        active: true,
        started: true
      }
    case TIMER_PAUSE:
      return {
        ...state,
        active: false
      }
    // eslint-disable-next-line
    case TIMER_COMPLETE:
      // important for it to be this way - state has to be copied, not assigned
      // otherwise redux will not see changes, as it compares the
      // memory locations
      const res = { ...state }
      if (state.type === WORK) {
        // if timer type is WORK, then work cycle is currently ending
        res.count += 1

        if (state.count !== 0 && (state.count + 1) % 4 === 0) {
          // if another 4 pomodoros are done, then give long break
          res.type = LONG_BREAK
          res.time = state.times.longBreak
        } else {
          // else give a short break
          res.type = BREAK
          res.time = state.times.shortBreak
        }
      } else {
        // else start work cycle
        res.type = WORK
        res.time = state.times.work
      }

      if (res.time < action.overflow) {
        return timer(res, complete(action.overflow - res.time))
      }
      res.time -= action.overflow
      return res
    case TIMER_RESET:
      return initialState
    default:
      return state
  }
}

export default timer
